import styled, {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import {ArrowBack, Close} from "@material-ui/icons";
import {useLocation, useNavigate} from "react-router";
import {publicRequest} from "../requestMethods";
import {Link} from "react-router-dom";

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


const OrderDetail = () => {
    const goBack = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[2];


    const[order, setOrder] = useState(null);
    const[createdTime, setCreatedTime] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await publicRequest.get("/orders/get/" + id);
                setOrder(res.data);
                setCreatedTime(res.data.createdAt.substring(0,10));
            } catch (err){
                console.log(err);
            }
        };
        getOrder();
    }, [id]);



    return (
        <div>
            <GlobalStyle/>
        <Container>
            <Wrapper>
                <Div1>
                    <ArrowBack onClick={() => goBack(-1)}/>
                    <Title>Order</Title>
                </Div1>

                <Form>
                    {order &&
                        <OrderContainer>
                            <OrderDiv>

                                <Label>Order Id: {order._id}</Label>
                                <Label>Order Amount: ${order.amount}.00</Label>
                                <Label>Status: {order.status}</Label>
                                <Label>Date: {createdTime}</Label>

                                {order.products.map((product) => (
                                    <div style={{marginTop: "10px", display: "flex",
                                        flexDirection: "column"}}>
                                        <Link to={`/product/${product.productId}`}>
                                            <Label>Product Id: {product.productId}</Label>
                                        </Link>

                                        <Label>Quantity: {product.quantity}</Label>
                                    </div>
                                ))}

                            </OrderDiv>

                        </OrderContainer>
                    }

                </Form>
            </Wrapper>
        </Container>
        </div>
    )
}

export default OrderDetail