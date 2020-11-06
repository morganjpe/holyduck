import React, {useState} from 'react';
import tw,{styled} from 'twin.macro';
import {useForm} from 'react-hook-form';
import {isValid} from 'postcode';


// components 
import {Button} from './Button';

const CheckoutModal = ({basket, showModal}) => {

    const {register, handleSubmit, errors } = useForm();

    const isValidPostcode = (postcode) => {
        
        const noWhiteSpacePostCode = postcode.replace(/\s/g, "").toLowerCase();
        if(isValid(noWhiteSpacePostCode) && 
        (noWhiteSpacePostCode.includes('ta2') || noWhiteSpacePostCode.includes('ta2')) ) {
            return true;
        }
        return 'false';
    }

    const checkoutButton = (data) => {
        console.log(data);

        const order = {
            products: basket,
            address: data
        }

        console.log(order);

    //    const socket = socketIOClient('http://localhost:3001')
    //    console.log(socket);
    //    socket.emit('order', JSON.stringify(basket))
    }

    return(
        <CheckoutModal.container>
            <CheckoutModal.overlay onClick={() => showModal(false)} />
            
            <CheckoutModal.form onSubmit={handleSubmit(checkoutButton)}>
                <h3>Your Address Details</h3>
                <p>We are currently only delivering to TA1, TA2 postcodes</p>

                <input ref={register({required: true})} type="text" id="addressLine1" name='addressLine1' placeholder="1st line of address" />

                <input ref={register({required: true, pattern: /^(?:(?:00)?44|0)7(?:[45789]\d{2}|624)\d{6}$/i})} type="number" id="phoneNumber" name='phoneNumber' placeholder="Mobile Number" />
                {errors.phoneNumber && <span>Please enter a valid phone number, We may need to call if we get lost!</span>}


                <input ref={register({required: true, validate: value => isValidPostcode(value)})} type="text" id="postcode" name='postcode' placeholder="TA..." />
                {errors.postcode && <span>Please enter a valid postcode</span>}
                <Button>Checkout Now</Button>
            </CheckoutModal.form>

        </CheckoutModal.container>
    );
}

CheckoutModal.container = styled.div`
    ${tw`m-auto container flex fixed justify-center items-center`}
    top: 0;
    height: 100vh;
    width: 100vh;
`;

CheckoutModal.overlay = styled.div`
    ${tw`fixed`}
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
    background-color: rgba(0,0,0,.7);
`;

CheckoutModal.form = styled.form`
    z-index: 50000;
    background-color: white;
    input {
        width: 100%;
        display: block;
    }
`;


const Checkout = ({basket}) => {

    const [modal, showModal] = useState(false);

    const total = basket
        .map(({price, quantity}) => price * quantity)
        .reduce((prev, next) => prev + next ).toFixed(2);

    const checkout = () => {
        showModal(true);
    }

    return(
    <>
        <Checkout.container>
            <Checkout.grid>
                <ul>
                    <li>
                        Total: <span>&pound;{total}</span>
                    </li>
                    <li>
                        Vat: 20%: <span>&pound;{(total / 100 * 20).toFixed(2)}</span>
                    </li>
                    <li>
                        SubTotal: <span>&pound; {(total * 1.2).toFixed(2)}</span>
                    </li>
                </ul>         
                <Button onClick={checkout}>Checkout Now</Button>
            </Checkout.grid>
        </Checkout.container>
        {modal ? <CheckoutModal basket={basket} showModal={showModal} /> : ''}
    </>
    )
}

Checkout.container = styled.div`
    ${tw`mx-auto fixed container flex justify-end`}
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`;

Checkout.grid = styled.div`
    ${tw`w-full sm:w-1/2`}
    padding: 20px;
`;

export default Checkout;