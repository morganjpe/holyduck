import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import tw, {styled} from 'twin.macro';

// components
import Toggle from './Toggle';

// state 
import {UPDATE, DELETE} from '../state/basket/commands';

const BasketItem = ({
    name, 
    quantity, 
    price, 
    stock,
    index, 
    setBasket
}) => {

    const [value, setValue] = useState(quantity);

    useEffect(() => {
        if(value) {
            setBasket({type: UPDATE, payload: {index, quantity: value}})
        } else {
            setBasket({type: DELETE, payload: {index}})
        }
    },[setBasket, index, value]);

    const incQuantity = () => {
        if(value + 1 <= stock ) {
            setValue(value + 1);
        }
    }

    const decQuantity = () => {
        if(value - 1 >= 1) {
            setValue(value - 1);
        } else {
            setValue(0);
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
        <BasketItem.container>
            <Toggle quantity={value} quantityReducer={quantityReducer} />
            {name} - {quantity} - £{(price * quantity).toFixed(2)}
        </BasketItem.container>
    )
}

BasketItem.container = styled.li`
    ${tw`flex flex-wrap`}
`;



BasketItem.propTypes = {
    name: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
    price: propTypes.number.isRequired,
}

const BasketList = ({basket, setBasket}) => {

    return(
        <BasketList.container>
            <ul>
                {basket.length ? basket.map((item, index) => {
                    console.log(item);
                    return <BasketItem  
                                key={item.id} 
                                setBasket={setBasket}
                                index={index}
                                basket={basket}
                                {...item} />
                }) : <li>Your basket is empty</li>}
            </ul>
        </BasketList.container>
    )
}

BasketList.container = styled.section`
    ${tw`w-full md:w-1/2`}
`;

export default BasketList;