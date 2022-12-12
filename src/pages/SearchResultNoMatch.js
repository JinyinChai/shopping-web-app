import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Products from "../components/Products";
import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {publicRequest} from "../requestMethods";
import Product from "../components/Product";
import {Link} from "react-router-dom";

const Container = styled.div``
const Title = styled.h1`
    margin: 20px;
`

const SearchResultNoMatch = () => {

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>No results found.</Title>
            <Footer/>
        </Container>
    )
}

export default SearchResultNoMatch