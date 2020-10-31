import React from 'react';
import tw,{styled} from 'twin.macro';
import propTypes from 'prop-types';
import { number } from 'prop-types';

const Toggle = ({quantity, quantityReducer}) => {
    return(
        <Toggle.container>
            
            <input type="number" readOnly value={quantity} />
        </Toggle.container>
    )
}

Toggle.container = styled.div`
    ${tw`flex flex-wrap`}
`;

Toggle.button = styled.button`
    ${tw`flex items-center justify-center`}
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid
`;

Toggle.input = styled.input`

`;

Toggle.propTypes = {
    quantity: propTypes.number.isRequired,
    quantityReducer: propTypes.func.isRequired,
}

export default Toggle;