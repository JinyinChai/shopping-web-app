import styled from "styled-components";
import {popularProducts} from "../data";
import Product from "./Product";
import {useEffect, useState} from "react";
import axios from "axios";
import {publicRequest} from "../requestMethods";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchProducts = ({cat, filters, sort}) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);


    return (
        <Container>
            {products.map((item) => (
                <Product item={item} key={item.id}/>
            ))}
        </Container>
    )
}

export default SearchProducts