import styled from "styled-components";

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

const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="first name"/>
                    <Input placeholder="last name"/>
                    <Input placeholder="username"/>
                    <Input placeholder="email"/>
                    <Input placeholder="password"/>
                    <Input placeholder="confirm password"/>
                    <AccountType>
                        <Desc>Account Type</Desc>
                        <Input2 type="radio" id="buyer" name="acc_type" value="HTML"/>
                        <Label htmlFor="buyer">Buyer</Label>
                        <Input2 type="radio" id="seller" name="acc_type" value="HTML"/>
                        <Label htmlFor="seller">Seller</Label>
                    </AccountType>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register