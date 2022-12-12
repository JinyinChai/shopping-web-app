import styled, {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import {login, updateUser} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {publicRequest, userRequest} from "../requestMethods";
import Product from "../components/Product";
import {Close, ArrowBack} from '@material-ui/icons';
import {deleteOrderThunk} from "../redux/orderRedux";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const GlobalStyle = createGlobalStyle`
    body {
      background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)), #61dafb;
    }
`

const Container = styled.div`
  background-size: cover;
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 50%;
    padding: 20px;
  background-color: white;
`

const Title = styled.h1`
    font-size: 24px;
  font-weight: 300;
  font-weight: bold;
  text-align: center;
`

const Form = styled.form`
    display: flex;
  flex-direction: column;
`

const Button = styled.button`
    width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`

const Error = styled.span`
    color: red;
`

const Label = styled.label`
    flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`


const OrderDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CloseDiv = styled.div`
  margin-top: 15px;
    width: 5%;
  //display: flex;
  align-items: flex-end;
  cursor: pointer;
`

const OrderContainer = styled.div`
    display: flex;
`

const OrderTitle = styled.h1`
  margin-top: 30px;
  font-size: 24px;
  font-weight: 300;
  font-weight: bold;
  text-align: center;
`

const Div1 = styled.div`
    //display: flex;
`

const UserProfile = () => {
    const user = useSelector((state) => state.user.currentUser);

    const id = user._id;
    const[orders, setOrders] = useState(null);
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await publicRequest.get("/orders/find/" + id);
                setOrders(res.data);
                // console.log(res.data);
            } catch (err){
                // console.log(err);
            }
        };
        getOrders();
    });

    const dispatch = useDispatch();
    const goBack = useNavigate();
    const deleteOrderHandler = (orderId) => {
        dispatch(deleteOrderThunk(orderId));
    }

    return (
        <div>
            <GlobalStyle/>
        <Container>
            <Wrapper>
                <Div1>
                    <ArrowBack onClick={() => goBack(-1)}/>
                    <Title>Profile: {user.firstname} {user.lastname}</Title>
                </Div1>

                <Form>
                    <Label>Username: {user.username}</Label>
                    <Label>Email: {user.email}</Label>
                        <Link to="/editProfile">
                            <Button>Edit Profile</Button>
                        </Link>

                    <OrderTitle>Orders</OrderTitle>
                    {orders && orders.map((order) => (
                        <OrderContainer>
                            <OrderDiv>
                                <Label>Order id: {order._id}</Label>
                                <Label>Order Amount: ${order.amount}</Label>
                            </OrderDiv>
                            <CloseDiv>
                                <Close onClick={() => {deleteOrderHandler(order._id);}}/>
                            </CloseDiv>
                        </OrderContainer>
                    )) }

                </Form>
            </Wrapper>
        </Container>
        </div>
    )
}

export default UserProfile