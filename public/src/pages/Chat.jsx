import  { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  // eslint-disable-next-line
  useEffect(() => {
  const checkUser = async () => {
    const storedUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (!storedUser) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(storedUser));
    }
  };
  checkUser();
}, [navigate]);

// eslint-disable-next-line
useEffect(() => {
  if (!currentUser) return;

  socket.current = io(host);
  socket.current.emit("add-user", currentUser._id);

  return () => {
    socket.current.disconnect();
  };
}, [currentUser]);

// eslint-disable-next-line
useEffect(() => {
  const fetchContacts = async () => {
    if (!currentUser) return;

    if (currentUser.isAvatarImageSet) {
      try {
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    } else {
      navigate("/setAvatar");
    }
  };

  fetchContacts();
}, [currentUser, navigate]);



  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 90vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 0.5rem;
    overflow: hidden;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (max-width: 720px) {
      grid-template-columns: 100%;
    }
  }
`;
