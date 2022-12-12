import styled from "styled-components";
import {useState} from "react";
import {login, updateUser} from "../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileThunk} from "../redux/profileRedux";
import {ArrowBack} from '@material-ui/icons';
import {useNavigate} from "react-router";

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

const InputDiv = styled.div`
    display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const Div1 = styled.div`
    display: flex;
`

const EditProfile = () => {

    const [temp, setTemp] = useState(useSelector((state) => state.user.currentUser));

    const [password, setPassword] = useState(temp.Orinalpassword);

    const dispatch = useDispatch();
    const goBack = useNavigate();

    const [user, setUser] = useState({
        username: temp.username,
        firstname: temp.firstname,
        lastname: temp.lastname,
        password: temp.Originalpassword,
        email: temp.email,
        createdAt: temp.createdAt,
        updatedAt: temp.updatedAt,
        _id: temp._id,
        isAdmin: temp.isAdmin,
        isSeller: temp.isSeller,
        __v: temp.__v,
    })


    const saveProfile = (e) => {
        e.preventDefault();
        updateProfileThunk(dispatch, user);
    }

    return (
        <Container>
            <Wrapper>
                <Div1>
                    <ArrowBack onClick={() => goBack(-1)}/>
                    <Title>Edit Profile: {user.firstname} {user.lastname}</Title>
                </Div1>

                <Form>
                    <InputDiv>
                        <span>firstname</span>
                        <Input defaultValue={user.firstname} onChange={(event) => setUser({...user, firstname: event.target.value})}/>
                    </InputDiv>
                    <InputDiv>
                        <span>lastname</span>
                        <Input defaultValue={user.lastname} onChange={(event) => setUser({...user, lastname: event.target.value})}/>
                    </InputDiv>
                    <InputDiv>
                        <span>username</span>
                        <Input defaultValue={user.username} onChange={(event) => setUser({...user, username: event.target.value})}/>
                    </InputDiv>
                    <InputDiv>
                        <span>email</span>
                        <Input defaultValue={user.email} onChange={(event) => setUser({...user, email: event.target.value})}/>
                    </InputDiv>
                    <InputDiv>
                        <span>password</span>
                        <Input type="password" defaultValue={user.password} onChange={(event) => setUser({...user, password: event.target.value})}/>
                    </InputDiv>

                    <Button onClick={saveProfile}>Update</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default EditProfile