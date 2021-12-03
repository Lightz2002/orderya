import React, { useState, createContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export const ProductContext = createContext();

function ProductProvider(props) {
    const [productList, setProductList] = useState([]);
    const [cartList, setCartList] = useState([]);

    function updateQuantity(cart_id, scope) {
        axios
            .put(`/api/cart/updateQuantity/${cart_id}/${scope}`)
            .then((res) => {
                if (res.data.status === 200) {
                    return;
                }
            });
    }

    const increaseQuantity = (e, cart_id) => {
        setCartList((cart) =>
            cart.map((item) => {
                let itemQuantity =
                    item.product_type === "Foods"
                        ? item.foods.quantity
                        : item.drinks.quantity;

                return cart_id === item.id
                    ? {
                          ...item,
                          product_qty:
                              item.product_qty +
                              (item.product_qty < itemQuantity ? 1 : 0),
                      }
                    : item;
            })
        );

        updateQuantity(cart_id, "inc");
    };

    const decreaseQuantity = (e, cart_id) => {
        setCartList((cart) =>
            cart.map((item) => {
                return cart_id === item.id
                    ? {
                          ...item,
                          product_qty:
                              item.product_qty - (item.product_qty > 1 ? 1 : 0),
                      }
                    : item;
            })
        );

        updateQuantity(cart_id, "dec");
    };

    const addToCart = (e, item, quantity) => {
        const existedItem = cartList.find(
            (cartItem) => cartItem.id === item.id
        );
        if (existedItem) {
            Swal.fire(
                "Failed",
                "This product had already been added to cart",
                "error"
            );

            return;
        }

        const data = {
            product_id: item.id,
            product_type: item.category.type,
            product_qty: quantity,
        };

        axios.post(`/api/addToCart`, data).then((res) => {
            if (res.data.status === 201) {
                Swal.fire(
                    "Success",
                    "Your product has been successfully added to cart",
                    "success"
                );
            } else if (res.data.status === 409) {
                Swal.fire("Failed", res.data.message, "error");
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
            }
        });
    };

    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        let thisClicked = e.currentTarget;

        axios.delete(`/api/deleteCartItem/${cart_id}`).then((res) => {
            if (res.data.status === 200) {
                setCartList((cart) =>
                    cart.filter((item) => item.id !== cart_id)
                );
                Swal.fire("Success", res.data.message, "success");
                thisClicked.closest(".cart-column").remove();
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
            }
        });
    };

    return (
        <ProductContext.Provider
            value={{
                productList,
                setProductList,
                deleteCartItem,
                cartList,
                setCartList,
                increaseQuantity,
                decreaseQuantity,
                addToCart,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;
