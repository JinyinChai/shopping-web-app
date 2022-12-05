import styled, {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ArrowBack, Close} from "@material-ui/icons";
import {useLocation, useNavigate} from "react-router";
import {publicRequest} from "../requestMethods";
import {deleteUserThunk} from "../redux/userRedux";

const GlobalStyle = createGlobalStyle`
    body {
      background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)), #61dafb;
    }
`

const Container = styled.div`
  //width: 100vw;
  //height: 100vh;
  //background-color: aquamarine;
  //background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)), #61dafb;
  //background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)),
  //url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
  background-size: cover;
  display: flex;
  //align-items: center;
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



const Input = styled.input`
    flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
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

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Div1 = styled.div`

`

const OrderContainer = styled.div`
    display: flex;
  margin-top: 20px;
`


const ProductImg = styled.img`
  width: 20%;
`

const OrderDiv = styled.div`
  margin-top: 15px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const OrderTitle = styled.h1`
  margin-top: 30px;
  font-size: 24px;
  font-weight: 300;
  font-weight: bold;
  text-align: center;
`


const UpdateButton = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 30px;
`

const CloseDiv = styled.div`
  margin-top: 15px;
    width: 5%;
  //display: flex;
  align-items: flex-end;
  cursor: pointer;
`

const ButtonDiv1 = styled.div`
  //display: flex;
  align-items: center;
    justify-content: space-between;
`

const PaymentDetail = () => {
    // const curUser = useSelector((state) => state.user.currentUser);
    const goBack = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    // const stripe = require('stripe')(process.env.STRIPE_KEY);

    const[payment, setPayment] = useState(null);

    useEffect(() => {
        const getPayment = async () => {
            try {
                const res = await publicRequest.get("/checkout/" + id);
                setPayment(res.data);
                // console.log(res.data);
            } catch (err){
                console.log(err);
            }
        };
        getPayment();
    });
    //
    // const dispatch = useDispatch()
    // const deleteUserHandler = (productId) => {
    //     // dispatch(deleteUserThunk(productId));
    // }

    return (
        <div>
            <GlobalStyle/>
        <Container>
            <Wrapper>
                <Div1>
                    <ArrowBack onClick={() => goBack(-1)}/>
                    <Title>Payments</Title>
                </Div1>

                <Form>
                    {payment &&
                        <OrderContainer>
                            <OrderDiv>

                                <Label>Payment Id: {payment.id}</Label>
                                <Label>Payment Amount: ${payment.amount / 100}.00</Label>
                                <Label>Customer: {payment.billing_details.name}</Label>
                                <Label>Payment Card: xxxx xxxx xxxx {payment.payment_method_details.card.last4}</Label>
                                <Label>Billing Address: {payment.billing_details.address.line1}, {payment.billing_details.address.city},
                                    {payment.billing_details.address.state} {payment.billing_details.address.postal_code}</Label>

                            </OrderDiv>

                        </OrderContainer>
                    }

                </Form>
            </Wrapper>
        </Container>
        </div>
    )
}

export default PaymentDetail