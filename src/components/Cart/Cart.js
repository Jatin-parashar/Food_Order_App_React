import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount.toFixed((2));
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const orderHandler = () => {
        setIsCheckout(true);
    }
    const cartItems = (<ul className={classes['cart-items']}>{cartCtx.items.map((item) => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />)}</ul>);
    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
        </div>
    );
    function sendUserDataHandler(userData) {
        setIsSubmitting(true);
        fetch('https://foodcart-b8675-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartContentModal = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
            </div>
            {isCheckout ? <Checkout onConfirm={sendUserDataHandler} onCancel={props.onClose} /> : modalActions}
        </Fragment>
    )

    const submittingCartDataModal = <p>Sending order data...</p>;
    const submittedCartDataModal = (
        <Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
        </Fragment>
    )

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartContentModal}
            {isSubmitting && submittingCartDataModal}
            {!isSubmitting && didSubmit && submittedCartDataModal}

        </Modal>
    )
}

export default Cart;