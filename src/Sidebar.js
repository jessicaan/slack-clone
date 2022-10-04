import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@mui/icons-material/Edit";
import SidebarOption from "./SidebarOption";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarHeaderLeft>
          <h2>DEV'S HQ</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarHeaderLeft>
        <SidebarHeaderRight>
          <EditIcon />
        </SidebarHeaderRight>
      </SidebarHeader>
      <SidebarOption Icon={InsertCommentIcon} title="Tópicos" />
      <SidebarOption Icon={InboxIcon} title="Menções & Reações" />
      <SidebarOption Icon={DraftsIcon} title="Itens Salvos" />
      <SidebarOption Icon={BookmarkIcon} title="Canais" />
      <SidebarOption Icon={PeopleAltIcon} title="Pessoas & Grupos" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="Arquivos" />
      <SidebarOption Icon={ExpandLessIcon} title="Mostrar menos" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Canais" />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Adicionar Canal" />
      {channels?.docs.map((doc) => (
        <SidebarOption
          title={doc.data().name}
          key={doc.id}
          id={doc.id}
          selectChannel
        />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

// Estilos 👇🏻

const SidebarContainer = styled.div`
  background-color: #3f0f40;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  flex: 0.28;
  border-top: 1px solid #49274b;
  color: white;

  > hr {
    border-top: 1px solid #49274b;
    opacity: 0.1;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding-bottom: 20px;
`;

const SidebarHeaderLeft = styled.div`
  color: white;
  margin-left: 20px;
  align-content: center;
  flex: 0.8;

  > h2 {
    font-size: 14px;
    font-weight: 900;
  }

  > h3 {
    font-size: 12px;
    margin-top: 8px;
    width: 200px;
    font-weight: 400;
  }

  > h3 > .MuiSvgIcon-root {
    color: green;
    margin-right: 5px;
    height: 12px;
    width: 12px;
  }
`;

const SidebarHeaderRight = styled.div`
  flex: 0.2;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
