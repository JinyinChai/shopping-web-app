import styled, {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import {ArrowBack, Close} from "@material-ui/icons";
import {useLocation, useNavigate} from "react-router";
import {publicRequest} from "../requestMethods";

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



const Label = styled.label`
    flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`

const Div1 = styled.div`

`

const OrderContainer = styled.div`
    display: flex;
  margin-top: 20px;
`

const OrderDiv = styled.div`
  margin-top: 15px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`


const PaymentDetail = () => {
    const goBack = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];


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