import React, {useEffect, useState, createContext} from 'react';
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
        getUser().then(
            user => setState({...state, status: 'success', user: user}),
            error => setState({...state, status: 'error', user: null})
        );
    });

    return(
        <AuthContext.Provider value={state}>
            {state.status === 'pending' ? (
                'Loading... '
            ) : state.error ? (
                <div><pre>state.error</pre></div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}


const Orders = () => {

    const [orders, setOrders] = useState([]);

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
        <AuthProvider>
            {orders.length ? (

                <ul>
                {orders.map(order => {
                    return(
                        <li key={order.orderTime}>
                            order time: {order.orderTime}
                            <ul>
                                {order.orderDetails.map(item => {
                                    return(
                                        <li key={item.id}>
                                            {item.name} - {item.price}
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
                </ul>

            ) : 'no orders currently'}
        </AuthProvider>
    )


}


export default Orders;