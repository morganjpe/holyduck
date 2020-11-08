import React, {useEffect, useState, createContext} from 'react';
import axios from 'axios';
import tw,{styled, theme} from 'twin.macro';
import propTypes from 'prop-types';
// import socketIOClient from 'socket.io-client';

const wait = time => new Promise((resolve) => setTimeout(resolve, time));
const getUser = () => wait(1000).then(() => ({login: '1234'}));
const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [state, setState] = useState({
        status: 'pending',
        error: null,
        user: null,
    });
    useEffect(() => {
        getUser().then(() => {

        

            // user => setState({...state, status: 'success', user: user});
            // error => setState({...state, status: 'error', user: null})
        });
    });

    return(
        <AuthContext.Provider value={state}>
            {state.status === 'pending' ? (
                'Loading... '
            ) : state.error ? (
                <div><pre>{state.error}</pre></div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}

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

const StatusInput = ({status, action, checked}) => {
    return(
        <StatusInput.group status={status}>
            <input 
                checked={checked === status}
                type="radio" 
                name="status" 
                id={status} 
                value={status} 
                onChange={action} />
            <label htmlFor={status}>{status}</label>
        </StatusInput.group>
    )
}

StatusInput.group = styled.div`
    padding: 30px;

    input {
        display: none;
    }

    label {
        padding: 10px 20px;
        cursor: pointer;
    }

    input:checked ~ label {
        color: white;
        border-radius: 7px;
        background: ${({theme}) => theme.colors.hd_red};
    }
`;

StatusInput.propTypes = {
    status: propTypes.string.isRequired,
    action: propTypes.func.isRequired,
}

const Orders = () => {
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(!orders.length) {
            getAllOrders();
        }
        console.log(orders);
    })

    const getAllOrders = () => {
        axios.get('http://localhost:3001/orders')
            .then(({data}) => setOrders(data))
            .catch(err => console.log(err))
    }

    // useEffect(() => {
    //     const socket = socketIOClient('http://localhost:3001');
    //     console.log(socket);
    //     socket.on('order_views', data => {
    //         const date = new Date();
    //         const order = {
    //             orderDetails: JSON.parse(data),
    //             orderTime: `${date.getHours()}:${date.getMinutes()}`
    //         }
    //         console.log(order);
    //         setOrders([...orders, order]);
    //     })
    // });

    const updateOrder = (e, ref) => {

        const value = e.target.value;
        console.log(ref);

        axios.put(`http://localhost:3001/orders${ref}`, {
            status:e.target.value
        })
        .then(({data}) => {
            if(data.updated === ref) {
                console.log(value);
                getAllOrders();
            }
        })
        .catch(err => console.log(err));
    }

    const deleteOrder = (ref) => {
        axios.delete(`http://localhost:3001/orders${ref}`)
            .then(({data}) => {
                if(data.deleted === ref) {
                    getAllOrders();
                }
            })
        .catch(err => console.log(err));
    }

    return(
        <>
            {orders.length ? (
                <Orders.list>
                    {orders.map(order => {
                        return(
                            <Orders.order key={order.reference}>
                                <h4>Order reference - {order.reference}</h4>
                                <OrderList 
                                    orders={order.order} 
                                    subKey={order.reference} />
                                <br />
                                <AddressList address={order.address} />
                                <br />
                                <Orders.status>
                                    <StatusInput checked={order.status} status="processing" action={(e) => updateOrder(e, order.reference)} />
                                    <StatusInput checked={order.status} status="confirmed" action={(e) => updateOrder(e, order.reference)} />
                                    <StatusInput checked={order.status} status="delivering" action={(e) => updateOrder(e, order.reference)} />
                                    <StatusInput checked={order.status} status="complete" action={() => deleteOrder(order.reference)} />
                                </Orders.status>
                            </Orders.order>
                        )
                    })}
                </Orders.list>

            ) : 'no orders currently'}
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