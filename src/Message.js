import React from "react";
import styled from "styled-components";

function Message({ message, timestamp, user, photoURL }) {
  return (
    <MessageContainer>
      <img src={photoURL} alt="" />
      <MessageInfo>
        <h4>
          {user}{" "}
          <span>
            {"-"}
            {new Date(timestamp?.seconds * 1000).toLocaleString("pt-br", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    width: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
