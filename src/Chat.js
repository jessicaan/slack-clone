import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { selectRoomId } from "./features/appSlice";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import Message from "./Message";

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);

  //   Pegando detalhes dos canais do firestore
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  //   Pegando mensagens de cada canal do firestore
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      <>
        <ChatHeader>
          <ChatHeaderLeft>
            <h4>
              <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderOutlined />
          </ChatHeaderLeft>
          <ChatHeaderRight>
            <p>
              <InfoOutlined /> Detalhes
            </p>
          </ChatHeaderRight>
        </ChatHeader>
        {roomDetails && roomMessages && (
          <>
            <ChatMessages>
              {roomMessages?.docs.map((doc) => {
                const { message, timestamp, user, photoURL } = doc.data();

                return (
                  <Message
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    photoURL={photoURL}
                  />
                );
              })}
              <ChatBottom ref={chatRef} />
            </ChatMessages>

            <ChatInput
              chatRef={chatRef}
              channelId={roomId}
              channelName={roomDetails?.data().name}
            />
          </>
        )}
      </>
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled.div`
  height: 100px;
  background-color: white;
  position: sticky;
  bottom: 0;
  width: auto;
`;

const ChatContainer = styled.div`
  flex: 0.72;
  color: black;
  overflow-y: scroll;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const ChatHeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div`
  background-color: white;
`;
