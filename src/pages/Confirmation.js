import React from 'react';
import { useLocation } from "react-router-dom";
import tw, {styled} from 'twin.macro';

const Confirmation = () => {
    
    const location = useLocation();

    return(
        <div>
            
        </div>
    )

    return 'Order completed \n' + JSON.stringify(location.state.order);
}

export default Confirmation