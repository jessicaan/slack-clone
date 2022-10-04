import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import "./styles/App.css";
import Chat from "./Chat";
import Header from "./components/Header";
import Sidebar from "./Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111615.png"
            alt=""
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fade="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
            </Routes>
          </AppBody>
        </>
      )}
    </Router>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
