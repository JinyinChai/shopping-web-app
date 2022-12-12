import styled, {createGlobalStyle} from "styled-components";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ArrowBack, Close, Search} from "@material-ui/icons";
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Payments = () => {
    // const curUser = useSelector((state) => state.user.currentUser);
    const goBack = useNavigate();

    // const stripe = require('stripe')(process.env.STRIPE_KEY);
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const path = location.pathname.split("/")[1];

    const navigate = useNavigate();
    const[payments, setPayments] = useState(null);

    useEffect(() => {
        const getPayments = async () => {
            if (id){
                try {
                    const res = await publicRequest.get("/checkout/search/" + id);
                    setPayments(res.data);
                    // console.log(res.data);
                    if (res.data.data.length === 0){
                        // console.log(1);
                        navigate("/searchPayment");
                    }
                } catch (err) {
                    console.log(err);
                }

            } else {
                try {
                    const res = await publicRequest.get("/checkout/");
                    setPayments(res.data);
                    // console.log(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        getPayments();
    }, [id]);

    const dispatch = useDispatch();
    const handleClick = (e) => {
        goBack("/adminProfile");
    };


    const [search, setSearch] = useState(null);

    const handleSearch = (e) => {
        if (search){
            let temp = search;
            setSearch(null);
            navigate(`/searchPayment/${temp}`);
        }

    };


    if (path === "searchPayment" && payments.data.length === 0){
        return (
            <div>
                <GlobalStyle/>
                <Container>
                    <Wrapper>
                        <Div1>
                            <ArrowBack style={{cursor: "pointer"}} onClick={handleClick}/>
                            <Title>Payments</Title>
                            <SearchContainer>
                                <Input placeholder={"Postal Code"} onChange={(event) => setSearch(event.target.value)}/>
                                <Search style={{color: "gray", fontSize: 16, cursor: "pointer"}}
                                        onClick={handleSearch}/>
                            </SearchContainer>
                        </Div1>
                        <Title>No Payments Found in Such Postal Code Area.</Title>
                    </Wrapper>
                </Container>
            </div>
        );
    } else {
        return (
            <div>
                <GlobalStyle/>
                <Container>
                    <Wrapper>
                        <Div1>
                            <ArrowBack style={{cursor: "pointer"}} onClick={handleClick}/>
                            <Title>Payments</Title>
                            <SearchContainer>
                                <Input placeholder={"Postal Code"} onChange={(event) => setSearch(event.target.value)}/>
                                <Search style={{color: "gray", fontSize: 16, cursor: "pointer"}}
                                        onClick={handleSearch}/>
                            </SearchContainer>
                        </Div1>
                        {id ?
                            <Form>
                                {payments && payments.data && payments.data.map((payment) => (
                                    <OrderContainer>
                                        <OrderDiv>
                                            <Link to={`/payment/${payment.id}`}>
                                                <Label style={{cursor: "pointer"}}>Payment Id: {payment.id}</Label>
                                            </Link>
                                            <Label>Payment Amount: ${payment.amount / 100}.00</Label>
                                            <Label>Customer: {payment.billing_details.name}</Label>
                                            <Label>Payment Card: xxxx xxxx
                                                xxxx {payment.payment_method_details.card.last4}</Label>
                                        </OrderDiv>

                                    </OrderContainer>
                                ))}

                            </Form>
                            : <Form>
                                {payments && payments.data && payments.data.map((payment) => (
                                    <OrderContainer>
                                        <OrderDiv>
                                            <Link to={`/payment/${payment.id}`}>
                                                <Label style={{cursor: "pointer"}}>Payment Id: {payment.id}</Label>
                                            </Link>
                                            <Label>Payment Amount: ${payment.amount / 100}.00</Label>
                                            <Label>Customer: {payment.billing_details.name}</Label>
                                            <Label>Payment Card: xxxx xxxx
                                                xxxx {payment.payment_method_details.card.last4}</Label>
                                        </OrderDiv>

                                    </OrderContainer>
                                ))}

                            </Form>
                            }
                    </Wrapper>
                </Container>
            </div>
        );
    }
}

export default Payments