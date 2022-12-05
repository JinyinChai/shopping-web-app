import styled, {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ArrowBack, Close} from "@material-ui/icons";
import {useNavigate} from "react-router";
import {publicRequest} from "../requestMethods";
import {deleteProductThunk} from "../redux/productRedux";

const GlobalStyle = createGlobalStyle`
    body {
      background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)), #61dafb;
    }
`

const Container = styled.div`
  background-size: cover;
  display: flex;
  //align-items: center;
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



const Input = styled.input`
    flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`


const Button = styled.button`
    width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`

const Error = styled.span`
    color: red;
`

const Label = styled.label`
    flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Div1 = styled.div`

`

const OrderContainer = styled.div`
    display: flex;
  margin-top: 20px;
`


const ProductImg = styled.img`
  width: 20%;
`

const OrderDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const OrderTitle = styled.h1`
  margin-top: 30px;
  font-size: 24px;
  font-weight: 300;
  font-weight: bold;
  text-align: center;
`


const UpdateButton = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 30px;
`

const CloseDiv = styled.div`
  margin-top: 15px;
    width: 5%;
  //display: flex;
  align-items: flex-end;
  cursor: pointer;
`

const SellerProfile = () => {
    const user = useSelector((state) => state.user.currentUser);
    const goBack = useNavigate();
    const[products, setProducts] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get("/products/findByUser/" + user._id);
                setProducts(res.data);
                // console.log(res.data);
            } catch (err){
                // console.log(err);
            }
        };
        getProducts();
    }, [user._id]);

    const dispatch = useDispatch()
    const deleteProductHandler = (productId) => {
        dispatch(deleteProductThunk(productId));
    }

    return (
        <div>
            <GlobalStyle/>

        <Container>
            <Wrapper>
                <Div1>
                    <ArrowBack onClick={() => goBack(-1)}/>
                    <Title>Profile: {user.firstname} {user.lastname}</Title>
                </Div1>

                <Form>
                    <Label>Username: {user.username}</Label>
                    <Label>Email: {user.email}</Label>
                    <Link to="/editProfile">
                        <Button>Edit Profile</Button>
                    </Link>

                    <Link to="/addProduct">
                        <Button>Add Product</Button>
                    </Link>

                    <OrderTitle>Products</OrderTitle>
                    {products && products.map((product) => (
                        <OrderContainer>
                            <OrderDiv>
                                <Link to={`/product/${product._id}`}>
                                    <Label>Product Title: {product.title}</Label>
                                </Link>
                                <Label>Product id: {product._id}</Label>
                                <Link to={`/editProduct/${product._id}`}>
                                    <UpdateButton>Update Product</UpdateButton>
                                </Link>
                            </OrderDiv>
                            <ProductImg src={product.img}></ProductImg>
                            <CloseDiv>
                                <Close onClick={() => {deleteProductHandler(product._id); window.location.reload(false);}}/>
                            </CloseDiv>
                        </OrderContainer>
                    )) }

                </Form>
            </Wrapper>
        </Container>
        </div>
    )
}

export default SellerProfile