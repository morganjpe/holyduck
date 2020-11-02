import React, {useState} from 'react';
import propTypes from 'prop-types';
import tw, {styled} from 'twin.macro';

// components
import Toggle from './Toggle';

// state 
// import {basketReducer} from '../state/reducers';

const BasketItem = ({name, quantity, price}) => {

    // const [value, setValue] = useState(quantity);

    return(
        <BasketItem.container>
            {/* <Toggle quantity={value} quantityReducer={} /> */}
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

const BasketList = ({basket}) => {
    return(
        <BasketList.container>
            <ul>
                {basket.length ? basket.map((item, index) => {
                    console.log(item);
                    return <BasketItem key={item.id} index={index} {...item} />
                }) : <li>Your basket is empty</li>}
            </ul>
        </BasketList.container>
    )
}

BasketList.container = styled.section`
    ${tw`w-full md:w-1/2`}
`;

export default BasketList;