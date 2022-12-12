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
import UserProfile from "./pages/UserProfile";
import SellerProfile from "./pages/SellerProfile";
import EditProfile from "./pages/EditProfile";
import PublicProfile from "./pages/publicProfile";
import EditProduct from "./pages/EditProduct";
import AdminProfile from "./pages/AdminProfile";
import Payments from "./pages/Payments";
import SearchResult from "./pages/SearchResult";
import SearchResultNoMatch from "./pages/SearchResultNoMatch";
import AddProduct from "./pages/AddProduct";
import PaymentDetail from "./pages/PaymentDetail";
import SearchPaymentNoMatch from "./pages/SearchPaymentNoMatch";
import OrderDetail from "./pages/OrderDetail";

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
              <Route path="/userProfile" element={<UserProfile/>}/>
              <Route path="/sellerProfile" element={<SellerProfile/>}/>
              <Route path="/editProfile" element={<EditProfile/>}/>
              <Route path="/publicProfile/:id" element={<PublicProfile/>}/>
              <Route path="/editProduct/:id" element={<EditProduct/>}/>
              <Route path="/adminProfile" element={<AdminProfile/>}/>
              <Route path="/payments" element={<Payments/>}/>
              <Route path="/searchPayment/:id" element={<Payments/>}/>
              <Route path="/search/:title" element={<SearchResult/>}/>
              <Route path="/search" element={<SearchResultNoMatch/>}/>
              <Route path="/addProduct" element={<AddProduct/>}/>
              <Route path="/payment/:id" element={<PaymentDetail/>}/>
              <Route path="/searchPayment" element={<SearchPaymentNoMatch/>}/>
              <Route path="/order/:id" element={<OrderDetail/>}/>
          </Routes>
        </BrowserRouter>
    );
};

export default App;