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

                // console.log(res.data.sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)));
                // setFilteredProducts(
                //             [...products].sort((a, b) => a.createdAt - b.createdAt)
                //         );

            } catch (err) {

            }
        };
        getProducts();
    }, [cat]);

    // useEffect(() => {
    //     setFilteredProducts(products.sort((a, b) => a.createdAt - b.createdAt)
    //     );
    //
    // }, [products]);


    // useEffect(() => {
    //     cat && setFilteredProducts(
    //         products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value))
    //         )
    //     );
    //
    // }, [products, cat, filters]);

//     useEffect(() => {
//         if (sort === "newest") {
//             setFilteredProducts(prev =>
//                 [...prev].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
//             );
//         } else if (sort === "asc") {
//             setFilteredProducts(prev =>
//                 [...prev].sort((a, b) => a.price - b.price)
//             );
//         } else {
//             setFilteredProducts(prev =>
//                 [...prev].sort((a, b) => b.price - a.price)
//             );
//         }
//     }, [sort]);
//
//     // console.log(products);
    return (
        <Container>
            {/*{cat ? filteredProducts.map((item) => (*/}
            {/*    <Product item={item} key={item.id}/>*/}
            {/*)) :*/}
            {products.map((item) => (

                <Product item={item} key={item.id}/>
            ))}
        </Container>
    )
}

export default Products