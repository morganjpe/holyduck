import React, {useState} from "react";
import propTypes, { string } from 'prop-types';
import tw, {styled} from 'twin.macro';
import {findIndex} from 'lodash';

// components
import Toggle from './Toggle';

// state commands
import {CREATE, UPDATE} from '../state/commands';

const Modal = ({
    name, 
    price, 
    desc, 
    img,
    stock,
    id,
    close,
    setBasket,
    basket
}) => {

    const [quantity, setQuantity] = useState(1);
    const [err, setErr] = useState(false);

    const basketPayload = {
        name, 
        price, 
        desc, 
        img,
        stock,
        id,
    }

    const addToBasket = () => {
        const index = findIndex(basket, item => item.id === id);
        // if index exists and is within quantity range
        if(index > -1 && basket[index].quantity + quantity <= stock) {
            // already exists
            close();
            return setBasket({
                type: UPDATE,
                payload: {index, quantity}
            });
        } else if(quantity <= stock && index === -1) {
            close();
            return setBasket({
                type: CREATE, 
                payload: { item: {...basketPayload, quantity} }
            });
        }
        setErr(true);
    }

    const incQuantity = () => {
        if(quantity + 1 <= 10 /* stock */) {
            setQuantity(quantity + 1);
        }
    }

    const decQuantity = () => {
        if(quantity - 1 >= 1) {
            setQuantity(quantity - 1);
        }  
    }

    const quantityReducer = action => {
        switch(action) {
            case 'DECREMENT' : return decQuantity();
            case 'INCREMENT' : return incQuantity();
            default: return quantity;
        }
    }

    return(
            <Modal.container>
                <Modal.overlay onClick={close} />
                <Modal.content>
                    <h2>{name}</h2>
                    <p>{desc}</p>

                    <Toggle quantity={quantity} quantityReducer={quantityReducer} />
                    <Modal.button onClick={decQuantity}>-</Modal.button>
                    <Modal.quantity value={quantity} readOnly />
                    <Modal.button onClick={incQuantity}>+</Modal.button>

                    {err ? 'you have exeeded total quantity' : ''}

                    <Modal.addToBasket onClick={addToBasket}>
                        Add To Basket
                    </Modal.addToBasket>
                </Modal.content>
            </Modal.container>
    )
}

Modal.container = styled.div`
    ${tw`flex justify-center flex fixed items-center`}
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
`;

Modal.overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.8);
    z-index: 1001;
`;

Modal.content = styled.div`
    ${tw`w-full md:w-1/2`}
    background: white;
    z-index: 1002;
`;

Modal.quantity = styled.input``;

Modal.button = styled.button``;

Modal.addToBasket = styled.button`
    width: 100%;
    padding: 10px;
    text-align: center;
`;

Modal.propTypes = {
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    desc: propTypes.string.isRequired,
    img: propTypes.arrayOf(string).isRequired,
    stock: propTypes.number.isRequired,
    close: propTypes.func.isRequired,
    id: propTypes.number.isRequired,
    // addToBasket: propTypes.func.isRequired
}

export default Modal;