import React from 'react'
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import {useSelector} from "react-redux";

const Home = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <div>
            {/*<Announcement/>*/}
            <Navbar/>
            {/*<Slider/>*/}
            <Categories/>
            <Products/>
            <Footer/>
        </div>
    )
}

export default Home