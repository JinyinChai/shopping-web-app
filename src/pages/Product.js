import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import {Add, Remove, Person} from "@material-ui/icons";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {addProduct} from "../redux/cartRedux";
import {useDispatch} from "react-redux";
import {publicRequest} from "../requestMethods";
import {Link} from "react-router-dom";

const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 50px;
  display: flex;
  background-color: #f0fffd;
`

const ImgContainer = styled.div`
    flex: 1;
  
`

const Image = styled.img`
    width: 100%;
  height: 90vh;
  object-fit: cover;
`

const InfoContainer = styled.div`
    flex: 1;
  padding: 0px 50px;
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0px;
`

const Price = styled.span`
    font-weight: 100;
  font-size: 40px;
`

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
    display: flex;
  justify-content: space-between;
`

const Filter = styled.div`
    display: flex;
  align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
  font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
  padding: 5px;
`

const FilterSizeOption = styled.option`
    
`

const AddContainer = styled.div`
  width: 50%;
    display: flex;
  align-items: center;
  justify-content: space-between;
`

const AmountContainer = styled.div`
    display: flex;
  align-items: center;
  font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`

const Button = styled.button`
    padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  
  &:hover{
    background-color: #E3FFFE;
  }
`

const SellerInfoContainer = styled.div`
    
`

const Desc1 = styled.p`
    font-size: 20px;
  margin-top: 20px;
`

const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const[product, setProduct] = useState({});
    const[quantity, setQuantity] = useState(1);
    const[color, setColor] = useState("");
    const[size, setSize] = useState("");
    const dispatch = useDispatch();
    const[seller, setSeller] = useState({});
    const[createdTime, setCreatedTime] = useState(null);


    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
                setCreatedTime(res.data.createdAt.substring(0,10));
                const getSeller = async () => {
                    try {
                        const res2 = await publicRequest.get("/users/find/" + res.data.seller);
                        setSeller(res2.data);
                    } catch (err){

                    }
                };
                getSeller();
            } catch (err){

            }
        };
        getProduct();
    }, [id]);


    const handleQuantity = (type) => {
        if (type === "dec"){
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    }

    const handleClick = () => {
        dispatch(
        addProduct({...product, quantity, color, size}));
    };


    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)}/>
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}

                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                    <SellerInfoContainer>
                        <Link to={`/publicProfile/${seller._id}`}>
                        <Desc1>Seller: {seller.username}

                                <Person/>

                        </Desc1>
                        </Link>
                    </SellerInfoContainer>
                    <Desc>Created at: {createdTime}</Desc>
                </InfoContainer>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Product