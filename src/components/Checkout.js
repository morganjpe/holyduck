import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import tw,{styled} from 'twin.macro';
import {useForm} from 'react-hook-form';
import {isValid} from 'postcode';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import scriptLoader from 'react-async-script-loader';

// components 
import {Button} from './Button';

const CheckoutModal = ({basket, showModal}) => {

    const {register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const [orderDetails, setOrderDetails] = useState({});

    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const createOrder = (data, actions) => {

        return actions.order.create({
            purchase_units: basket.map(({name, price, quantity}) => ({
                description: name,
                amount: {
                    currency_code: "GBP",
                    value: (price * quantity)
                }
            }),

        )})
    };
    
    const onApprove = (data, actions) => {
        const orderID = data.orderID;
        history.push('/confirmation', {...orderDetails, ref: orderID});
        return actions.order.capture();
    };



    const isValidPostcode = (postcode) => {
        
        const noWhiteSpacePostCode = postcode.replace(/\s/g, "").toLowerCase();
        if(isValid(noWhiteSpacePostCode) && 
        (noWhiteSpacePostCode.includes('ta2') || noWhiteSpacePostCode.includes('ta2')) ) {
            return true;
        }
        return 'false';
    }

    const checkoutButton = (data) => {
        console.log("????");

        setOrderDetails({
            products: basket,
            address: data
        }) 
    }



    return(
        <CheckoutModal.container>
            <CheckoutModal.overlay onClick={() => showModal(false)} />
            <CheckoutModal.group>
                { !Object.keys(orderDetails).length ? (
                    <CheckoutModal.form onSubmit={handleSubmit(checkoutButton)}>
                        <CheckoutModal.form.content>
                            <h3>Your Address Details</h3>
                            <p>We are currently only delivering to TA1, TA2 postcodes</p>

                            <input ref={register({required: true})} type="text" id="addressLine1" name='addressLine1' placeholder="1st line of address" />

                            <input ref={register({required: true, pattern: /^(?:(?:00)?44|0)7(?:[45789]\d{2}|624)\d{6}$/i})} type="number" id="phoneNumber" name='phoneNumber' placeholder="Mobile Number" />
                            {errors.phoneNumber && <span>Please enter a valid phone number, We may need to call if we get lost!</span>}


                            <input ref={register({required: true, validate: value => isValidPostcode(value)})} type="text" id="postcode" name='postcode' placeholder="TA..." />
                            {errors.postcode && <span>Please enter a valid postcode</span>}
                        </CheckoutModal.form.content>
                        <Button>Click here to pay</Button>
                    </CheckoutModal.form>
                ) : (
                    <PayPalButton 
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)} />
                )}
            </CheckoutModal.group>
        </CheckoutModal.container>
    );
}

CheckoutModal.container = styled.div`
    ${tw`flex fixed justify-center items-center`}
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
`;

CheckoutModal.overlay = styled.div`
    ${tw`fixed`}
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
    background-color: rgba(0,0,0,.7);
    cursor: pointer;
`;

CheckoutModal.group = styled.div`
    ${tw`w-full md:w-1/3`}
    z-index: 50000;
    background-color: white;
    overflow: hidden;
    border-radius: 7px;

    iframe {
        padding: 20px;
    }
`;

CheckoutModal.form = styled.form`

    span {
        color: red;
        font-size: 12px;
        padding: 10px;
    }

    input {
        margin-top: 10px;
        padding: 15px;
        border: 1px solid #eee;
        width: 100%;
        display: block;
    }
`;

CheckoutModal.form.content = styled.div`
    padding: 30px;
`;  


const Checkout = ({basket}) => {

    const [modal, showModal] = useState(false);

    const total = () => {

        if(basket && basket.length) {

            return basket
            .map(({price, quantity}) => price * quantity)
            .reduce((prev, next) => prev + next ).toFixed(2);
        }
        return 0;
    }

    const checkout = () => {
        showModal(true);
    }

    return(
    <>
        <Checkout.container>
            <Checkout.grid>
                    <li>
                        Total: <span>&pound;{total()}</span>
                    </li>
                    <li>
                        Vat: 20%: <span>&pound;{(total() / 100 * 20).toFixed(2)}</span>
                    </li>
                    <li>
                        SubTotal: <span>&pound;{(total()* 1.2).toFixed(2)}</span>
                    </li>      
                
            </Checkout.grid>
            <Button disabled={!basket.length} onClick={checkout}>Checkout Now</Button>
        </Checkout.container>
        {modal ? <CheckoutModal basket={basket} showModal={showModal} /> : ''}
    </>
    )
}

Checkout.container = styled.div`
`;

Checkout.grid = styled.ul`
    list-style: none;
    padding: 20px 0;
    margin: 0;

    li {
        padding: 5px 0;
       display: flex;
       justify-content: space-between;

        span {
            color: grey;
        }

    }
`;


//sb-9zpwc3734285@business.example.com
//Zq>o$>1z

export default scriptLoader(
    'https://www.paypal.com/sdk/js?currency=GBP&client-id=Ab6oJnSdECyPV05wRy68D3-5hFcP-lYaNPQeY_JsSrvm0k53x5TXx_9-9BMAWFFAj5ZPoiGh2MkZHDpc'
)(Checkout)