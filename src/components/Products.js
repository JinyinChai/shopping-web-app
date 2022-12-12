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

const Products = ({cat, filters, sort}) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(cat ? `/products?category=${cat}`
                    : "/products");
                setProducts(res.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));

            } catch (err) {

            }
        };
        getProducts();
    }, [cat]);

    return (
        <Container>

            {products.map((item) => (

                <Product item={item} key={item.id}/>
            ))}
        </Container>
    )
}

export default Products