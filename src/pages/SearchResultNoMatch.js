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
const FilterContainer = styled.div`
    display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
`

const FilterText = styled.span`
    font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`

const Select = styled.select`
    padding: 10px;
  margin: 20px;
`
const Option = styled.option``


const ResultsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

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