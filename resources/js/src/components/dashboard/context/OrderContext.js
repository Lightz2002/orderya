import React, { useState, createContext } from "react";

export const OrderContext = createContext();

function OrderProvider(props) {
    const [orderList, setOrderList] = useState([]);

    return (
        <OrderContext.Provider value={{ orderList, setOrderList }}>
            {props.children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;
