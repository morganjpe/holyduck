import React from 'react';
import tw,{styled} from 'twin.macro';
import socketIOClient from "socket.io-client";
// import io
// import axios from 'axios'

// components 
import {Button} from './Button';

const Checkout = ({basket}) => {
    const total = basket
        .map(({price, quantity}) => price * quantity)
        .reduce((prev, next) => prev + next ).toFixed(2);

    const checkout = () => {
       console.log('clicked')
       const socket = socketIOClient('http://localhost:3001')
       console.log(socket);

    socket.emit('order', JSON.stringify(basket))


    //    socket.on("FromAPI", data => {
    //        console.log(data);
    //    })
    }

    return(
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