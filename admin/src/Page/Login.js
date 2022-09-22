import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, login } from "../Actions/LoginAction";
import styled from "styled-components";

import Email from "../Components/Images/email.png";
import Password from "../Components/Images/password.png";

function Login() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, alert, isAuthenticated]);

  return (
    <LoginContainer>
      <LoginBox>
        <div>
          <h2>LOGIN</h2>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <img src={Email} alt />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <img src={Password} alt />

              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            {/* <Link to="/password/forgot">Forget Password ?</Link> */}
            <input type="submit" value="Login" className="loginBtn" />
          </form>
        </div>
      </LoginBox>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  background-size: cover;
  position: fixed;
  top: 0%;
  left: 0;
`;

const LoginBox = styled.div`
 background-color: white;
  width: 25vw;
  height: 60vh;
  box-sizing: border-box;
  overflow: hidden;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 40vh;
    width: 40vw;
  }

  @media screen and (max-width: 600px){
    width: 60vw;
    height: 40vh;
  }


  h2{
    text-align: center;
  color: rgba(0, 0, 0, 0.664);
  font: 400 1.3vmax "Roboto";
  padding: 1.3vmax;
  border-bottom: 1px solid rgba(0, 0, 0, 0.205);
  width: 50%;
  margin: auto;

  @media screen and (max-width: 600px){
   padding: 1vmax 5vmax;
   font:  1.5vmax "Roboto";
  }
  }

  .loginForm{
    display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 2vmax;
  justify-content: space-evenly;
  height: 70%;
  transition: all 0.5s;
  }

  .loginForm > div {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 3vh;
}

.loginForm > div > input {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax cursive;
  outline: none;

  @media screen and (max-width: 600px){
   padding: 1vmax 5vmax;
   font:  2vmax cursive;
  }
}

.loginForm > div > img {
  position: absolute;
  transform: translateX(1vmax);
}

.loginBtn {
    margin-top: 3vh;
  border: none;
  background-color: rgb(199, 131, 67);
  color: white;
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
}

.loginBtn:hover {
  background-color: rgb(148, 93, 42);
}


`

export default Login;
