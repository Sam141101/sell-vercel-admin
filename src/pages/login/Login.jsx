import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    // navigate("/");
    history.push("/");
  };

  return (
    <div style={{ backgroundColor: "#d1cbca" }}>
      <div className="header">
        <div className="header-contai">
          <img
            className="header-img"
            src="https://file.hstatic.net/200000312481/file/2222_1790556c641f404aab8dfb038b47eb0e.png"
            alt=""
          />
          <h2 className="header-title">Đăng nhập</h2>
        </div>
      </div>
      <div className="login">
        <input
          className="loginInput"
          type="text"
          placeholder="Tài khoản"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="loginInput"
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="loginButton" onClick={handleClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
