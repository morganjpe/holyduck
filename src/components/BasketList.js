import React from 'react';
import propTypes from 'prop-types';
import tw, {styled} from 'twin.macro';

const BasketItem = ({name, quantity, price}) => {
   
    return(
        <BasketItem.container>

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

const BasketList = ({basketItems}) => {
    console.log(basketItems);
    return(
        <BasketList.container>
            <ul>
                {basketItems.length ? basketItems.map(item => {
                    console.log(item);
                    return <BasketItem key={item.id} {...item} />
                }) : <li>Your basket is empty</li>}
            </ul>
        </BasketList.container>
    )
}

BasketList.container = styled.section`
    ${tw`w-full md:w-1/2`}
`;

export default BasketList;