import React from 'react';
import { useLocation } from "react-router-dom";
import tw, {styled} from 'twin.macro';
import {Link} from 'react-router-dom';

const Confirmation = () => {
    
    const location = useLocation();

    return(
        <Confirmation.container>
            <Confirmation.container.inner>
                <h2>Order successful</h2>
                <h4>we are currently preparing your order</h4>
                <ul className="order">
                    {location.state.order.products.map(({name, price, quantity, id}) => {
                        return (
                            <li key={id}>
                                {name} - {quantity} - £{(price * quantity).toFixed(2)}
                            </li>
                        ) 
                    })}
                </ul>
                <h3>Delivering To</h3>
                <ul>
                    <li>{location.state.order.address.addressLine1}</li>
                    <li>{location.state.order.address.postcode}</li>
                </ul>
                <Link to="/">
                    Order again?
                </Link>
            </Confirmation.container.inner>

        </Confirmation.container>
    )
}

Confirmation.container = styled.section`
    ${tw`mx-auto flex items-center justify-center`}
    height: 100vh;
    background: ${({theme}) => theme.colors.hd_red};
    
`;

Confirmation.container.inner = styled.div`
    width: 320px;
    border-radius: 7px;
    border: 1px solid #eee;
    text-align: center;
    background: white;
    padding: 30px 15px ;
    ul {
        padding: 0;
        margin: 0;
        list-style: none;

        li {
            
            padding: 10px;
            text-align: center;
        }
    }

    .order li {
        border-bottom: 1px solid #eee;
    }
`;

export default Confirmation