import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux"
import {clearErrors, forgotPassword} from "../../Actions/UserAction"
import {useAlert} from "react-alert"

import Email from "../../Components/Images/email.png";
import Loading from '../../Components/Loading'

function ForgotPassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, message, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [email, setEmail] = useState("");
  
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (message) {
        alert.success(message);
      }
    }, [dispatch, error, alert, message]);
  return (
    <Fragment>
    {loading ? (
      <Loading/>
    ) : (
      <Fragment>
         <ForgotPasswordContainer>
            <ForgotPasswordBox>
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                <img src={Email} alt />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </ForgotPasswordBox>
          </ForgotPasswordContainer>
      </Fragment>
    )}
  </Fragment>
  )
}

const ForgotPasswordContainer = styled.div`
 width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);
  position: fixed;
  top: 0%;
  left: 0;
`

const ForgotPasswordBox = styled.div`
 background-color: white;
  width: 25vw;
  height: 40vh;
  box-sizing: border-box;
  overflow: hidden;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 30vh;
    width: 40vw;
  }

  @media screen and (max-width: 600px){
    width: 60vw;
    height: 30vh;
  }

  .forgotPasswordHeading {
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

.forgotPasswordForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 2vmax;
  justify-content: space-evenly;
  height: 70%;
  transition: all 0.5s;
}

.forgotPasswordForm > div {
  display: flex;
  width: 100%;
  align-items: center;
}

.forgotPasswordForm > div > input {
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

.forgotPasswordForm > div > img {
  position: absolute;
  transform: translateX(1vmax);
}

.forgotPasswordBtn {
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

.forgotPasswordBtn:hover {
  background-color: rgb(148, 93, 42);
}

`

export default ForgotPassword