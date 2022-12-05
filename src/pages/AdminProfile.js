import styled, {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ArrowBack, Close} from "@material-ui/icons";
import {useNavigate} from "react-router";
import {publicRequest} from "../requestMethods";
import {deleteUserThunk} from "../redux/userRedux";

const GlobalStyle = createGlobalStyle`
    body {
      background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)), #61dafb;
    }
`

const Container = styled.div`
  //width: 100vw;
  //height: 100vh;
  //background-color: aquamarine;
  //background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)), #61dafb;
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
  margin-top: 15px;
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

const ButtonDiv1 = styled.div`
  //display: flex;
  align-items: center;
    justify-content: space-between;
`

const AdminProfile = () => {
    const curUser = useSelector((state) => state.user.currentUser);
    const goBack = useNavigate();

    const[users, setUsers] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await publicRequest.get("/users/");
                setUsers(res.data);
                // console.log(res.data);
            } catch (err){
                console.log(err);
            }
        };
        getUsers();
    });

    const dispatch = useDispatch()
    const deleteUserHandler = (productId) => {
        dispatch(deleteUserThunk(productId));
    }

    const handleClick = (e) => {
        goBack("/");
    }

    return (
        <div>
            <GlobalStyle/>
        <Container>
            <Wrapper>
                <Div1>
                    <ArrowBack onClick={handleClick}/>
                    <Title>Profile: {curUser.firstname} {curUser.lastname}</Title>
                </Div1>

                <Form>
                    <Label>Username: {curUser.username}</Label>
                    <Label>Email: {curUser.email}</Label>

                    <ButtonDiv1>
                        <Link to="/editProfile">
                            <Button>Edit Profile</Button>
                        </Link>

                        <Link to="/editProfile">
                            <Button style={{marginLeft: "20px"}}>Edit Profile</Button>
                        </Link>
                    </ButtonDiv1>

                    <ButtonDiv1 style={{marginTop: "30px"}}>

                        <Link to="/payments">
                            <Button>Manage Payments</Button>
                        </Link>
                    </ButtonDiv1>


                    <OrderTitle>Users</OrderTitle>
                    {users && users.map((user) => (
                        <OrderContainer>
                            <OrderDiv>
                                <Link to={`/publicProfile/${user._id}`}>
                                <Label>UserId: {user._id}</Label>
                                </Link>
                                {/*<Link to={`/product/${product._id}`}>*/}
                                    <Label>Username: {user.username}</Label>
                                {/*</Link>*/}
                                <Label>Full name: {user.firstname} {user.lastname}</Label>
                                <Label>Email: {user.email}</Label>
                                {/*<Link to={`/editProduct/${product._id}`}>*/}
                                {/*    <UpdateButton>Update Product</UpdateButton>*/}
                                {/*</Link>*/}
                            </OrderDiv>
                            {/*<ProductImg src={product.img}></ProductImg>*/}
                            <CloseDiv>
                                <Close onClick={() => {deleteUserHandler(user._id); window.location.reload(false);}}/>
                            </CloseDiv>
                        </OrderContainer>
                    )) }

                </Form>
            </Wrapper>
        </Container>
        </div>
    )
}

export default AdminProfile