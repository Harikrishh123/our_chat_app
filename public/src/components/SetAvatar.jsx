import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute , getImageApi} from "../utils/APIRoutes";
export default function SetAvatar() {
  
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(async () => {
    const data = [];
    console.log("Hello world")
    const genders = ["male", "female", "boy", "girl", "male"]
    for (let i = 0; i < 5; i++) {
      const image = await axios.get(
        `${getImageApi}/${genders[i]}/${Math.round(Math.random() * 1000)}`
      );

      data.push(image.data.image);
    }
    
    setAvatars(data);
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  background-color: #131324;
  min-height: 100vh;
  width: 100%;
  padding: 1rem;

  .loader {
    max-width: 90%;
  }

  .title-container {
    text-align: center;
    padding: 0 1rem;
    h1 {
      color: white;
      font-size: clamp(1.2rem, 2vw, 2rem);
      line-height: 1.4;
    }
  }

  .avatars {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    width: 100%;
    max-width: 800px;

    .avatar {
      border: 0.3rem solid transparent;
      padding: 0.3rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out;

      img {
        width: clamp(60px, 12vw, 120px);
        height: clamp(60px, 12vw, 120px);
        transition: 0.3s ease-in-out;
      }
    }

    .selected {
      border: 0.3rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 0.8rem 1.6rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: clamp(0.8rem, 1.5vw, 1rem);
    text-transform: uppercase;
    &:hover {
      background-color: #6d44ff;
    }
  }

  @media (max-width: 768px) {
    gap: 1.5rem;

    .avatars {
      gap: 1rem;
    }

    .submit-btn {
      width: 100%;
      max-width: 300px;
    }
  }

  @media (max-width: 480px) {
    .title-container h1 {
      font-size: 1rem;
    }

    .avatars {
      gap: 0.8rem;
    }

    .submit-btn {
      padding: 0.7rem;
      font-size: 0.85rem;
    }
  }
`;
