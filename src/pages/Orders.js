import React, {useEffect, useState} from 'react';
import axios from 'axios';
import tw,{styled} from 'twin.macro';
import propTypes from 'prop-types';
import io from 'socket.io-client';


/* 
 * OrderList Component
 */
const OrderList = ({orders, subKey}) => {
    return JSON.parse(orders)
        .map(({name, price, quantity, id}) => {
            return(
                <span key={`${subKey}-${id}-products`}>
                    {name} - {quantity} - £{price}
                </span>
            )
        })
}

OrderList.propTypes = {
    orders: propTypes.string.isRequired,
    subKey: propTypes.string.isRequired,
}

/* 
 * AddressList Component
 */
const AddressList = ({address}) => {
    const {
        addressLine1,
        phoneNumber,
        postcode
    } = JSON.parse(address);

    return(
        <span>{addressLine1} - {phoneNumber} - {postcode}</span>
    );
}

AddressList.propTypes = {
    address: propTypes.string.isRequired,
}



const StatusInput = ({reference, status}) => {

    const [state, setState] = useState(status);

    const updateOrder = (value, ref) => {
    
        axios.put(`http://localhost:3001/orders${reference}`, {
            status: value
        })
        .then(res=> console.log(res))
        .catch(err => console.log(err));
    }

    const statusController = (e) => {
        e.preventDefault();
        setState(e.target.id)    
        updateOrder(e.target.id)
    }

    return(
        <div>
            <StatusInput.button id="processing" onClick={statusController} status={state}>
                Processing
            </StatusInput.button>
            <StatusInput.button id="confirmed" onClick={statusController} status={state}>
                Confirmed
            </StatusInput.button>
            <StatusInput.button id="delivery" onClick={statusController} status={state}>
                Delivery
            </StatusInput.button>
            <StatusInput.button id="complete" onClick={statusController} status={state}>
                Complete
            </StatusInput.button>
        </div>
    )
}


StatusInput.propTypes = {
    status: propTypes.string.isRequired,
    reference: propTypes.string.isRequired,
}

StatusInput.button = styled.button`
    background-color: ${ ({id, status}) => id === status ? 'green' : '' };
`;


const Orders = () => {

    const [orders, setOrders] = useState([]);

    const getAllOrders = () => {
        axios.get('http://localhost:3001/orders')
            .then(({data}) => {
                setOrders(data)
                console.log(data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
    
        getAllOrders();

        const socket = io('http://localhost:3001', {
            transports: ['websocket']
        })
    
        socket.on('new_order', (data) => {
            
            if(parseInt(window.localStorage.getItem('new_order')) !== data) {
                window.localStorage.setItem('new_order', data)
                getAllOrders();
            }
        })

    }, [])

    return(
        <>
            <Orders.list>
                {orders.length ? (
                    orders.map(({order, reference, address, status}) => {

                        return(
                            <Orders.order key={`${reference}_reference`}>


                                <h4>Order reference - {reference}</h4>
                                <OrderList orders={order} subKey={reference} />
                                <br/><br/>
                                <AddressList address={address} />
                                <Orders.status>
                                    <StatusInput status={status} reference={reference} />
                                </Orders.status>
                            </Orders.order>
                        )
                    })
                ) : 'no orders currently'}
            </Orders.list>
        </>
    )
}


Orders.list = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`;

Orders.order = styled.li`
    padding:  0 15px 15px 15px;
    border: 1px solid #eee;
    margin-bottom: 15px;
`;

Orders.status = styled.div`
    ${tw`flex`}
`;


export default Orders;
