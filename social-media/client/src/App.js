import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="../auth" />}
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="../home" /> : <Auth />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}
          />

          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="../auth" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
