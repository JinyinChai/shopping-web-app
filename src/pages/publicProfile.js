import styled, {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import {login, updateUser} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {publicRequest, userRequest} from "../requestMethods";
import Product from "../components/Product";
import {Close, ArrowBack} from '@material-ui/icons';
import {deleteOrderThunk} from "../redux/orderRedux";
import {Link} from "react-router-dom";
import {useLocation, useNavigate} from "react-router";

const GlobalStyle = createGlobalStyle`
    body {
      background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)), #61dafb;
    }
`

const Container = styled.div`
  //background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)), #61dafb;
  //width: 100vw;
  //height: 100vh;
  //background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)),
  //url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
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
  font-size: 20px;
`

const ButtonDiv = styled.div`
  //display: flex;
  //flex-direction: row;
  //align-items: center;
  //justify-content: space-between;
`

const OrderDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CloseDiv = styled.div`
  margin-top: 15px;
    width: 5%;
  //display: flex;
  align-items: flex-end;
`

const OrderContainer = styled.div`
    display: flex;
  margin-top: 20px;
`

const OrderTitle = styled.h1`
  margin-top: 30px;
  font-size: 24px;
  font-weight: 300;
  font-weight: bold;
  text-align: center;
`

const Div1 = styled.div`
    //display: flex;
`

const ProductImg = styled.img`
  width: 20%;
`

const PublicProfile = () => {
    // const user = useSelector((state) => state.user.currentUser);
    const location = useLocation();
    const [seller, setSeller] = useState(null);
    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const getSeller = async () => {
            try {
                const res = await publicRequest.get("/users/find/" + id);
                setSeller(res.data);
            } catch (err){
                console.log(err);
            }
        };
        getSeller();
    }, [id]);


    const[products, setProducts] = useState(null);


    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get("/products/findByUser/" + id);
                setProducts(res.data);
                // console.log(res.data);
            } catch (err){
                // console.log(err);
            }
        };
        getProducts();
    }, [id]);


    // const dispatch = useDispatch();
    const goBack = useNavigate();
    // const deleteOrderHandler = (orderId) => {
    //     dispatch(deleteOrderThunk(orderId));
    // }



    return (
        <div>
        <GlobalStyle/>
        <Container>
            {seller &&
            <Wrapper>

                    <Div1>
                        <ArrowBack onClick={() => goBack(-1)}/>
                        <Title>Profile: {seller.firstname} {seller.lastname}</Title>
                    </Div1>

                <Form>
                    <Label>Username: {seller.username}</Label>
                    {/*<Label>Email: {seller.email}</Label>*/}
                    {/*<Link to="/editProfile">*/}
                    {/*    <Button>Edit Profile</Button>*/}
                    {/*</Link>*/}

                    {/*<Link to="/editProfile">*/}
                    {/*    <Button>Change Password</Button>*/}
                    {/*</Link>*/}
                    <OrderTitle>Products</OrderTitle>
                    {products && products.map((product) => (
                        <OrderContainer>
                            <OrderDiv>
                                <Link to={`/product/${product._id}`}>
                                    <Label>Product Title: {product.title}</Label>
                                </Link>
                                <Label>Product id: {product._id}</Label>
                            </OrderDiv>
                            <ProductImg src={product.img}></ProductImg>
                            {/*<CloseDiv>*/}
                            {/*    <Close onClick={() => {deleteOrderHandler(order._id); window.location.reload(false);}}/>*/}
                            {/*</CloseDiv>*/}
                        </OrderContainer>
                    )) }

                </Form>
            </Wrapper>}
        </Container>
        </div>
    )
}

export default PublicProfile