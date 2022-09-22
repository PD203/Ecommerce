import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../Actions/UserAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../Constants/userConstant";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import lock from "./Images/lock.png";
import lockopen from "./Images/password.png";
import VPNkey from "./Images/key.png"
import Loading from "./Loading";

function UpdatePassword() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.Profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated]);

  return (
    <Fragment>
    {loading ? (
      <Loading/>
    ) : (
      <Fragment>
        <UpdatePasswordContainer>
          <UpdatePasswordBox>
            <h2 className="updatePasswordHeading">Update Profile</h2>

            <form
              className="updatePasswordForm"
              onSubmit={updatePasswordSubmit}
            >
              <div className="loginPassword">
              <img src={VPNkey} alt="" />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="loginPassword">
                <img src={lockopen} alt="" />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
              <img src={lock} alt="" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Change"
                className="updatePasswordBtn"
              />
            </form>
          </UpdatePasswordBox>
        </UpdatePasswordContainer>
      </Fragment>
    )}
  </Fragment>
  )
}

const UpdatePasswordContainer = styled.div`
  /* width: 100vw;
  height: 100vh; */
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  /* top: 0%;
  left: 0; */
`

const UpdatePasswordBox = styled.div`
 background-color: white;
  width: 25vw;
  height: 70vh;
  box-sizing: border-box;
  overflow: hidden;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 40vh;
    width: 40vw;
  }

  @media screen and (max-width: 600px){
    width: 60vw;
    height: 50vh;
  }

  .updatePasswordHeading {
  text-align: center;
  color: rgba(0, 0, 0, 0.664);
  font: 400 1.3vmax "Roboto";
  padding: 1.3vmax;
  border-bottom: 1px solid rgba(0, 0, 0, 0.205);
  width: 50%;
  margin: auto;
}

.updatePasswordForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 2vmax;
  justify-content: space-evenly;
  height: 70%;
  transition: all 0.5s;
}

.updatePasswordForm > div {
  display: flex;
  width: 100%;
  align-items: center;
}

.updatePasswordForm > div > input {
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax cursive;
  outline: none;
}

.updatePasswordForm > div > img {
  position: absolute;
  transform: translateX(1vmax);
 
  @media screen and (max-width: 600px){
    width: 15px;
    height: 14px;
  }
}

.updatePasswordBtn {
  border: none;
  background-color: rgb(199, 131, 67);
  color: white;
  font: 300 0.9vmax "Roboto";
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
}

.updatePasswordBtn:hover {
    background-color: rgb(148, 93, 42);
}
`

export default UpdatePassword;
