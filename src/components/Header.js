import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <HeaderContainer>
      {/* Seção do lado esquerdo do header */}
      <HeaderLeft>
        <HeaderAvatarLeft
          src={user?.photoURL}
          onClick={() => auth.signOut()}
          alt={user?.displayName}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      {/* Seção do meio (barra de busca) */}
      <HeaderMiddle>
        <SearchIcon />
        <input placeholder="Buscar no SlackMaster" />
      </HeaderMiddle>

      {/* Seção do lado direito do header */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

// Estilos 👇🏻

const HeaderContainer = styled.div`
  display: flex;
  top: 0;
  background-color: #3f0f40;
`;

const HeaderLeft = styled.div`
  display: flex;
  margin: 10px;
  margin-left: 20px;
  align-items: center;
  justify-content: space-between;
  flex: 0.3;
  color: #fff;

  > .MuiSvgIcon-root {
    height: 25px;
    width: 25px;
  }
`;

const HeaderAvatarLeft = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const HeaderMiddle = styled.div`
  display: flex;
  flex: 0.5;
  width: auto;
  margin: 10px;
  margin-left: 20px;
  align-items: center;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  color: #fff;
  padding-left: 10px;
  background-color: #421f44;
  opacity: 1;

  > input {
    flex: 1;
    background-color: transparent;
    border: none;
    outline: 0;
    color: white;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  flex: 0.2;
  margin: 10px;
  margin-right: 20px;
  align-items: center;
  color: white;
  justify-content: flex-end;
`;
