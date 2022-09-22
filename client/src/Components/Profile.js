import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../Actions/UserAction";
import { useAlert } from "react-alert";
import {Box, Modal,} from "@mui/material"
import UpdatePassword from "./UpdatePassword";

import LogOut from "../Components/Images/logout.png";
import Loading from "./Loading";

const Profile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      Navigate("/account");
    }
  }, []);

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      {loading ? (
        <Loading/>
      ) : (
        <Fragment>
          <ProfileContainer>
            <ProfileImg>
              <h1>My Profile</h1>
              <Image>
                <img src={user.avatar.url} alt={user.name} />
              </Image>
              {/* <Link to="/me/update"> */}
              <button id="myBtn">{user.name}</button>
              {/* </Link> */}
              <Logout onClick={logoutUser}>
                <img src={LogOut} alt="" />
                <span>LogOut</span>
              </Logout>
            </ProfileImg>
            <Details>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <Select>
                <Link to="/orders">
                  <button>My Orders</button>
                </Link>
              
                <button onClick={() => setOpen(true)}>Change Password</button>
              
              </Select>
            </Details>
          </ProfileContainer>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box position="absolute" top="15%" left="40%" >
              <UpdatePassword/>
            </Box>
          </Modal>
        </Fragment>
      )}
    </Fragment>
  );
};

const ProfileContainer = styled.div`
  background-color: aqua;
  display: flex;
  width: 100vw;
  top: 0%;
  left: 0%;
  background-color: white;
  max-width: 100%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: 80vh;
  }
`;
const ProfileImg = styled.div`
  display: flex;
  width: 50vw;
  padding-top: 3vh;
  max-width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 50vh;
    width: 30vh;
    padding: 0;
  }

  @media screen and (max-width: 600px) {
    width: 100vw;
    padding-top: 3vh;
  }

  h1 {
    color: rgba(0, 0, 0, 0.555);
    font-size: 25px;
    padding-bottom: 8vh;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      padding-bottom: 3vh;
    }

    @media screen and (max-width: 600px) {
      padding: 0;
      font: 500 3.2vmax "Roboto";
      transform: translateY(-2vmax);
    }
  }

  button {
    border: none;
    background-color: rgb(199, 131, 67);
    font: 400 1vmax "Roboto";
    color: white;
    text-decoration: none;
    padding: 0.5vmax;
    width: 200px;
    margin: 4vmax;
    text-align: center;
    transition: all 0.5s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
    cursor: pointer;
    margin-bottom: 1vh;

    @media screen and (max-width: 600px) {
      font: 400 1.7vmax "Roboto";
      padding: 1vmax;
    }

    &:hover {
      background-color: rgb(148, 93, 42);
    }
  }
`;
const Image = styled.div`
  background-color: rgb(233, 233, 233);
  border-radius: 100%;
  transition: all 0.5s;
  height: 250px;
  width: 250px;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    height: 150px;
    width: 150px;
  }

  img {
    transition: all 0.5s;
    height: 250px;
    width: 250px;
    object-fit: contain;

    @media screen and (max-width: 600px) {
      height: 150px;
      width: 150px;
    }

    &:hover {
      transform: scale(1.5);
    }
  }
`;

const Details = styled.div`
  width: 50vh;
  justify-content: space-evenly;
  align-items: flex-start;
  box-sizing: border-box;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 30vh;
  }

  @media screen and (max-width: 600px) {
    width: 100vw;
  }

  h4 {
    color: black;
    font-size: 25px;

    @media screen and (max-width: 600px) {
      font-size: 16px;
    }
  }

  p {
    color: rgba(0, 0, 0, 0.418);
    font: 400 1vmax cursive;
    margin: 0.2vmax;
  }

  div {
    display: flex;
    height: 20vh;
    width: 100vw;
    max-width: 100%;
    flex-direction: column;
    justify-content: center;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      height: 11.5vh;
    }

    @media screen and (max-width: 600px) {
      height: 9vh;
      text-align: center;
    }
  }
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;

  button {
    border: none;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
    cursor: pointer;
    background-color: rgb(199, 131, 67);
    font: 400 1vmax "Roboto";
    color: white;
    text-decoration: none;
    padding: 0.5vmax;
    text-align: center;
    transition: all 0.5s;
    margin: 1vmax 0;

    @media screen and (max-width: 600px) {
      font: 400 1.7vmax "Roboto";
      padding: 1vmax;
      width: 30vh;
    }

    &:hover {
      background-color: rgb(148, 93, 42);
    }
  }
`;

const Logout = styled.div`
  margin-top: 1vh;
  img {
    position: absolute;
    transform: translateX(1vmax);

    @media screen and (max-width: 600px) {
      height: 13px;
      width: 10px;
      padding-top: 8px;
    }
  }
  span {
    padding: 0.5vmax 4vmax;
    padding-right: 1vmax;
    transition: all 0.5s;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax cursive;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: rgba(226, 226, 226, 0.863);
    }
  }
`;

export default Profile;
