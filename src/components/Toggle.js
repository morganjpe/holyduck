import React from 'react';
import tw,{styled} from 'twin.macro';
import propTypes from 'prop-types';

const Toggle = ({quantity, quantityReducer, max}) => {   
    return(
        <Toggle.container>
            <Toggle.button onClick={() => quantityReducer("DECREMENT")}>
                &minus;
            </Toggle.button>
            <Toggle.value>{quantity}</Toggle.value>
            <Toggle.button onClick={() => quantityReducer("INCREMENT")}>
                &#43;
            </Toggle.button>
        </Toggle.container>
    )
}

Toggle.container = styled.div`
    ${tw`flex justify-between`}
`;

Toggle.button = styled.button`
    ${tw`flex items-center justify-center`}
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${({theme}) => theme.colors.hd_red};
    background-color: white;
    color: ${({theme}) => theme.colors.hd_red};
    font-weight: 700;
`;

Toggle.value = styled.span`
    /* border: none;
    width:  */
`;

Toggle.propTypes = {
    quantity: propTypes.number.isRequired,
    quantityReducer: propTypes.func.isRequired,
    max: propTypes.number.isRequired
}

export default Toggle;