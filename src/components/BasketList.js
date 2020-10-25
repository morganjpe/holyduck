import React from 'react';
import propTypes from 'prop-types';
import tw, {styled} from 'twin.macro';

const BasketItem = ({item}) => {
    return(
        <li>
            {item.name} - {item.quantity} - £{item.price * item.quantity}
        </li>
    )
}

const BasketList = ({basketItems}) => {
    console.log(basketItems);
    return(
        <BasketList.container>
            <ul>
                {basketItems.length ? basketItems.map(item => {
                    return <BasketItem key={item.id} item={item} />
                }) : <li>Your basket is empty</li>}
            </ul>
        </BasketList.container>
    )
}

BasketList.container = styled.section`
    ${tw`w-full md:w-1/2`}
`;

export default BasketList;