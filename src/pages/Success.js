import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import {userRequest} from "../requestMethods";
import {Link} from "react-router-dom";
import {paymentSucceed} from "../redux/cartRedux";

const Success = () => {
    const location = useLocation();
    const data = location.state.StripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);
    const [created, setCreated] = useState(false);

    useEffect(() => {
        const createOrder = async () => {

            try {
                // if (cart.total === 0) {
                    const res = await userRequest.post("/orders", {
                        userId: currentUser._id,
                        products: cart.products.map((item) => ({
                            productId: item._id,
                            quantity: item.quantity,
                        })),
                        amount: cart.total,
                        address: data.billing_details.address,
                    });
                    setOrderId(res.data._id);
                    setCreated(true);
                // }
            } catch (err) {
                console.log(err);
            }
        };
        data && createOrder();

    }, [cart, data, currentUser]);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            paymentSucceed());
    };


    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {orderId ? `Order has been created successfully. Your order number is ${orderId}`
            : `Successfully. Your order is being prepared...`}
            <Link to={"/"}>
                <button style={{padding: 10,
                marginTop: 20}} onClick={handleClick}>Go to Homepage</button>
            </Link>
        </div>
    );
};

export default Success
