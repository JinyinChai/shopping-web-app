import styled, {createGlobalStyle} from "styled-components";
import React, {useEffect, useState} from "react";
import {ArrowBack, Close, Search} from "@material-ui/icons";
import {useLocation, useNavigate} from "react-router";

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

const Div1 = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between;
`


const SearchPaymentNoMatch = () => {

    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate("/payments");
    }

    return (
        <div>
            <GlobalStyle/>
            <Container>
                <Wrapper>
                    <Div1>
                        <ArrowBack onClick={handleClick}/>
                    </Div1>
                    <Title style={{marginTop: "20px"}}>No Payments Found in Such Postal Code Area.</Title>
                </Wrapper>
            </Container>
        </div>
    );
}

export default SearchPaymentNoMatch