import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./loginPage.css";
import ApiService from "../../services/apiService";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { setAuth } = useContext(AuthContext);
  const [userInput, setUserInput] = useState({ username: "", password: "" });

  const updateInput = (e) => {
    setUserInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    // authentication block
    try {
      const res = await ApiService.login(userInput);
      const { token, isAdmin } = res.data;

      setAuth({ token, isAdmin });
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);
      navigate("/");
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="auth-form">
      <div className="input-wrapper">
        <span className="input-header">Username</span>
        <input
          placeholder="Username"
          name="username"
          value={userInput.username}
          onInput={updateInput}
        />
      </div>
      <div className="input-wrapper">
        <span className="input-header">Password</span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userInput.password}
          onInput={updateInput}
        />
      </div>
      {error && <span className="error-span">{error}</span>}
      <button className="auth-form-button" onClick={handleLogin}>
        Login
      </button>
      <span>
        Dont have account?
        <Link to="/register">Register</Link>
      </span>
    </div>
  );
};

export default LoginPage;
