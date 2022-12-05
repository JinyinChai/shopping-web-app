import styled from "styled-components";
import {useState} from "react";
import {login, updateUser} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileThunk} from "../redux/profileRedux";
import {ArrowBack} from '@material-ui/icons';
import {useNavigate} from "react-router";
import {publicRequest} from "../requestMethods";

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

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
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

const AddProduct = () => {

    const [user, setUser] = useState(useSelector((state) => state.user.currentUser));
    const dispatch = useDispatch();
    const goBack = useNavigate();
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [img, setImg] = useState(null);
    const [price, setPrice] = useState(null);

    const handleInputChange = (e) => {
        const{id, value} = e.target;
        if(id === "title"){
            setTitle(value);
        } else if (id === "desc"){
            setDesc(value);
        } else if (id === "img"){
            setImg(value);
        } else if (id === "price"){
            setPrice(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await publicRequest.post("/products/newProduct", {
                seller: user._id,
                title: title,
                desc: desc,
                img: img,
                price: price,
            });
        } catch (err) {
            console.log(err);
        }
        // goBack(-1);
    }



    return (
        <Container>
            <Wrapper>
                <Div1>
                    <ArrowBack onClick={() => goBack(-1)}/>
                    <Title>Add Product: {user.firstname} {user.lastname}</Title>
                </Div1>

                <Form>
                    <InputDiv>
                        <Input placeholder="Product Title" id="title" onChange= {(e) => handleInputChange(e)}/>
                    </InputDiv>
                    <InputDiv>
                        {/*<span>lastname</span>*/}
                        <Input placeholder="Description" id="desc" onChange= {(e) => handleInputChange(e)}/>
                    </InputDiv>
                    <InputDiv>
                        {/*<span>username</span>*/}
                        <Input placeholder="Image Url" id="img" onChange= {(e) => handleInputChange(e)}/>
                    </InputDiv>
                    <InputDiv>
                        {/*<span>email</span>*/}
                        <Input placeholder="price" id="price" onChange= {(e) => handleInputChange(e)}/>
                    </InputDiv>

                    <Button onClick={handleSubmit}>Add</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default AddProduct