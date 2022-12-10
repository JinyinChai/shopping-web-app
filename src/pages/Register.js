import styled from "styled-components";
import {useEffect, useState} from "react";
import {publicRequest, userRequest} from "../requestMethods";
import {login} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Navigate, useNavigate} from "react-router";
import {ArrowBack} from "@material-ui/icons";

const Container = styled.div`
    width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255,255,255,0.5)), 
  url("https://img.freepik.com/free-photo/woman-black-trousers-purple-blouse-laughs-leaning-stand-with-elegant-clothes-pink-background_197531-17614.jpg?w=2000") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 40%;
    padding: 20px;
  background-color: white;
`

const Title = styled.h1`
    font-size: 24px;
  font-weight: 300;
  margin-left: 20px;
`

const Form = styled.form`
    display: flex;
  flex-wrap: wrap;
`



const Input = styled.input`
    flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
  margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`

const AccountType = styled.div`
  width: 15%;
  margin-top: 20px;
  font-size: 12px;
`

const Input2 = styled.input`
    flex: 1;
  min-width: 40%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
  
`

const Label = styled.label`
    margin: 0px 0px;
`

const Desc = styled.label`

`

const Div1 = styled.div`
    display: flex;
`

const Register = () => {

    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [userType, setUserType] = useState(null);
    let seller = false;
    let admin = false;
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const{id, value} = e.target;
        if(id === "firstname"){
            setFirstname(value);
        } else if (id === "lastname"){
            setLastname(value);
        } else if (id === "email"){
            setEmail(value);
        } else if (id === "password"){
            setPassword(value);
        } else if (id === "confirmPassword"){
            setConfirmPassword(value);
        } else if (id === "username") {
            setUsername(value);
        }
    }

    const setType = (e) => {
        setUserType(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userType === "seller"){
                seller = true;
            } else if (userType === "admin"){
                admin = true;
            }
            const res = await publicRequest.post("/auth/register", {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
                email: email,
                confirmPassword: confirmPassword,
                isAdmin: admin,
                isSeller: seller,
            });
        } catch (err) {
            console.log(err);
        }
        await login(dispatch, {username, password});
    }

    const goBack = useNavigate();



    return (
        <Container>
            <Wrapper>
                <Div1>
                    <ArrowBack style={{cursor: "pointer"}} onClick={() => goBack(-1)}/>
                    <Title>CREATE AN ACCOUNT</Title>
                </Div1>
                <Form>
                    <Input placeholder="first name" id="firstname" onChange= {(e) => handleInputChange(e)}/>
                    <Input placeholder="last name" id="lastname" onChange= {(e) => handleInputChange(e)}/>
                    <Input placeholder="username" id="username" onChange= {(e) => handleInputChange(e)}/>
                    <Input placeholder="email" id="email"  onChange= {(e) => handleInputChange(e)}/>
                    <Input placeholder="password" type="password" id="password"  onChange= {(e) => handleInputChange(e)}/>
                    <Input placeholder="confirm password" type="password" id="confirmPassword" onChange= {(e) => handleInputChange(e)}/>
                    <AccountType>
                        <Desc>Account Type</Desc>
                        <Input2 type="radio" id="buyer" name="account_type" value="buyer" onClick={setType.bind(this)}/>
                        <Label htmlFor="buyer">Buyer</Label>
                        <Input2 type="radio" id="seller" name="account_type" value="seller" onClick={setType.bind(this)}/>
                        <Label htmlFor="seller">Seller</Label>
                        <Input2 type="radio" id="admin" name="account_type" value="admin" onClick={setType.bind(this)}/>
                        <Label htmlFor="admin">Admin</Label>
                    </AccountType>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    {/*disabled={isFetching}*/}
                    <Button onClick={handleSubmit}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register