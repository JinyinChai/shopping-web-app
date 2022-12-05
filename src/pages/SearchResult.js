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

const SearchResult = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    const title = location.pathname.split("/")[2];
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(`/products/findByTitle/${title}`);
                setProducts(res.data);
                // console.log(res.data);

            } catch (err) {

            }
        };
        getProducts();
    }, [cat]);

    if (products.length === 0){
        navigate(`/search`);
    }



    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>{cat}</Title>

            <ResultsContainer>
                {products.map((item) => (
                    <Product item={item} key={item.id}/>
                ))}
            </ResultsContainer>
            <Footer/>
        </Container>
    )
}

export default SearchResult