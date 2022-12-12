import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Products from "../components/Products";
import {useLocation} from "react-router";
import {useState} from "react";

const Container = styled.div``
const Title = styled.h1`
    margin: 20px;
`

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");


    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>{cat}</Title>
            <Products cat={cat} filters={filters} sort={sort}/>
            <Footer/>
        </Container>
    )
}

export default ProductList