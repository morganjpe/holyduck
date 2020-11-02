import React from 'react';
import tw,{styled} from 'twin.macro';

// components 
import {Button} from './Button';

const Checkout = ({basket}) => {
    console.log(basket);
    const total = basket
        .map(({price, quantity}) => price * quantity)
        .reduce((prev, next) => prev + next ).toFixed(2);
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
                <Button>Checkout Now</Button>
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