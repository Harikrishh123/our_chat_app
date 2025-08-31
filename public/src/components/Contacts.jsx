import  { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";


export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [open, setOpen] = useState(false);

const handleChatSelect = (contact, index) => {
    changeChat(contact);      // switch chat
    setOpen(false);           // close dropdown after selection
  };
  
  useEffect(() => {
    const fetch = async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  };
  fetch();
  }, []);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Our chat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
<div className="brand">
        <h3>My Chats</h3>
        <FaBars className="menu-toggle" onClick={() => setOpen(!open)} />
      </div>
      <div className={`contacts ${open ? "show" : ""}`}>
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="contact"
            onClick={() => handleChatSelect(contact, index)}
            // onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h3>{contact.username}</h3>
            </div>
          </div>
        ))}
      </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  background-color: #080420;
  overflow: hidden;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-size: 1rem;
    }

    .menu-toggle {
      display: none;
      font-size: 1.5rem;
      color: white;
      cursor: pointer;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.6rem;
    transition: 0.3s ease-in-out;

    .contact {
      background-color: #ffffff34;
      min-height: 4rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.5rem;
      padding: 0.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.3s ease-in-out;

      .avatar img {
        height: 2.5rem;
      }
      .username h3 {
        color: white;
        font-size: 0.95rem;
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .avatar img {
      height: 3rem;
    }
    .username h2 {
      color: white;
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-rows: 12% 73% 15%;

    .brand h3 {
      font-size: 0.9rem;
    }

    .contacts .contact {
      min-height: 3.5rem;
      gap: 0.5rem;
      .avatar img {
        height: 2rem;
      }
      .username h3 {
        font-size: 0.85rem;
      }
    }

    .current-user .avatar img {
      height: 2.5rem;
    }
    .current-user .username h2 {
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 480px) {
    .brand {
      justify-content: space-between;
      padding: 0 1rem;

      .menu-toggle {
        display: block;
      }
    }

    .contacts {
      display: none;
      position: absolute;
      top: 12%;
      left: 0;
      background-color: #0d0d30;
      flex-direction: column;
      padding: 0.5rem;
      border-radius: 0.5rem;
      z-index: 10;
      max-height: 70vh;
      overflow-y: auto;
      margin-right: 1rem;
    }

    .contacts.show {
      display: flex;
    }

    .contacts .contact {
      flex-direction: column;
      align-items: center;
      width: 95%;
      margin: 0.2rem auto;
      .username h3 {
        font-size: 0.75rem;
      }
    }

    .current-user {
      flex-direction: column;
      gap: 0.3rem;
      .username h2 {
        font-size: 0.8rem;
      }
    }
  }
`;

