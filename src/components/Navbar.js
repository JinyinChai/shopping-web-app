import React, {useState} from 'react'
import styled from "styled-components";
import {Search, ShoppingCartOutlined, Person} from "@material-ui/icons";
import {Badge} from "@material-ui/core";
import {mobile} from "../responsive"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/apiCalls";
import {Navigate} from "react-router";

const Container = styled.div`
    height: 60px;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
  border: none;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch();
    const handleClick = (e) => {
        localStorage.clear();
        logout(dispatch);
        window.location.reload();
    };


    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Input/>
                        <Search style={{color:"gray", fontSize:16}}/>
                    </SearchContainer>
                </Left>
                <Center><Logo>Logo.</Logo></Center>
                <Right>
                    { user ?
                        <Right>
                            <MenuItem>Welcome, {user.username}</MenuItem>
                            <MenuItem onClick={handleClick}>Logout</MenuItem>
                            <Link to="/profile">
                                <MenuItem>

                                    <Badge badgeContent={quantity} color="primary">
                                        <Person/>
                                    </Badge>
                                </MenuItem>
                            </Link>
                        </Right>
                    :   <Right>
                            <Link to="/register">
                                <MenuItem>REGISTER</MenuItem>
                            </Link>
                            <Link to="/login">
                                <MenuItem>SIGN IN</MenuItem>
                            </Link>
                        </Right>
                    }

                    <Link to="/cart">
                        <MenuItem>

                                <Badge badgeContent={quantity} color="primary">
                                    <ShoppingCartOutlined/>
                                </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar