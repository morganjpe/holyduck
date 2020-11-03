import React, {useEffect, useState} from 'react';
import socketIOClient from 'socket.io-client';

const Orders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const socket = socketIOClient('http://localhost:3001');
        console.log(socket);
        socket.on('order_views', data => {

            const date = new Date();

            const order = {
                orderDetails: JSON.parse(data),
                orderTime: `${date.getHours()}:${date.getMinutes()}`
            }

            console.log(order);
        
            setOrders([...orders, order]);
        })
    });

    if(orders.length) {
        return(
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
        )
    }

    return 'no orders currently';


}


export default Orders;