import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {Route, Router, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";


const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/"
                     element={<Home/>}/>
              <Route path="/products" element={<ProductList/>}/>
          </Routes>
      </BrowserRouter>
  );
};

export default App;