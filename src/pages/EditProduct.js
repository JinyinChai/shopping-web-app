import styled from "styled-components";
import {useEffect, useState} from "react";
import {login, updateUser} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileThunk} from "../redux/profileRedux";
import {ArrowBack} from '@material-ui/icons';
import {useLocation, useNavigate} from "react-router";
import {publicRequest} from "../requestMethods";
import {updateProductThunk} from "../redux/productRedux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)),
  url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
`

const Title = styled.h1`
  margin-left: 30px;
  font-size: 24px;
  font-weight: 300;
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
  margin-top: 15px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`

const Error = styled.span`
  color: red;
`

const InputDiv = styled.div`
    display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const Div1 = styled.div`
    display: flex;
`

const EditProduct = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const goBack = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
                // console.log(res.data);
            } catch (err){
                // console.log(err);
            }
        };
        getProduct();
    }, [id]);


    const saveProduct = (e) => {
        e.preventDefault();
        dispatch(updateProductThunk(product));
    }

    return (
        <Container>
            { product && <Wrapper>
                <Div1>
                    <ArrowBack onClick={() => goBack(-1)}/>
                    <Title>Edit Product: {product.title}</Title>
                </Div1>

                <Form>
                    <InputDiv>
                        <span>Title</span>
                        <Input defaultValue={product.title} onChange={(event) => setProduct({...product, title: event.target.value})}/>
                    </InputDiv>
                    <InputDiv>
                        <span>Description</span>
                        <Input defaultValue={product.desc} onChange={(event) => setProduct({...product, desc: event.target.value})}/>
                    </InputDiv>
                    <InputDiv>
                        <span>Image</span>
                        <Input defaultValue={product.img} onChange={(event) => setProduct({...product, img: event.target.value})}/>
                    </InputDiv>
                    <InputDiv>
                        <span>Price</span>
                        <Input defaultValue={product.price} onChange={(event) => setProduct({...product, price: event.target.value})}/>
                    </InputDiv>

                    <Button onClick={saveProduct}>Update</Button>
                </Form>
            </Wrapper>}
        </Container>
    )
}

export default EditProduct