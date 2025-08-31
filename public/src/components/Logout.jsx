import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import image from  "../assets/add-user-302.svg"
import { useState } from "react";

export default function Logout() {
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const userData = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setuser(userData);
    };
    fetch();
  }, []);
  
  const handleClick = async () => {
    const id = user._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Container>
       {user && !user.avatarImage && <Avatar><img src={image} alt="" /></Avatar>}
      <Button onClick={handleClick}>
        <h3>Logout</h3>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
