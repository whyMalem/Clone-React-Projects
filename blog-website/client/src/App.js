import "./App.css";
import Login from "./components/account/Login";
import DataProvider from "./context/DataProvider";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import { useState } from "react";
import CreatePost from "./components/create/CreatePost";
import Detail from "./components/detail/Detail";
import UpdatePost from "./components/create/UpdatePost";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

const PrivateRoute = ({ isLogin, ...props }) => {
  return isLogin ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
            <Route path="/" element={<PrivateRoute isLogin={isLogin} />}>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/details/:id" element={<Detail />} />
              <Route path="/update/:id" element={<UpdatePost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
