import React, {useEffect, useState, createContext} from 'react';
import axios from 'axios';
import {styled} from 'twin.macro';
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

    return(
        <>
            {orders.length ? (
                <Orders.list>
                    {orders.map(order => {
                        return(
                            <Orders.order key={order.reference}>
                                <h4>{order.reference}</h4>
                                <OrderList 
                                    orders={order.order} 
                                    subKey={order.reference} />
                                <br />
                                <AddressList address={order.address} />
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


export default Orders;