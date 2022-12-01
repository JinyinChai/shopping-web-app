import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {Route, Router, Routes, Navigate} from "react-router";
import {BrowserRouter, Link} from "react-router-dom";
import Success from "./pages/Success";
import {useSelector} from "react-redux";
import Profile from "./pages/Profile";

const App = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/products/*" element={<ProductList/>}/>
              <Route path="/product/:id" element={<Product/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/success" element={<Success/>}/>
              <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}>
              </Route>
              <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
              <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
    );
};

export default App;