import React, { useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './Theme';
import styled from 'styled-components';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/Sociallcons';
import PowerButton from '../subComponents/PowerButton';
import CustomParticle from '../subComponents/CustomParticle';
import BigTitle from '../subComponents/BigTitle';
import { Github, LinkedIn, Gmail } from '../components/AllSvgs';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HamburgerMenu from '../subComponents/HamburgerMenu';
import CopyRight from '../subComponents/Copyright';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  background-color: ${props => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContactSection = styled.div`
  width: 80vw; /* Adjust the width as needed */
  max-height: 80vh; /* Adjust the max-height as needed */
  overflow-y: auto;
  padding: calc(2.5rem + 2.5vw) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  height: 100%; /* Add this line to enable scrolling */

  /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 0.8rem; /* Adjust the width as needed */
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent; /* Hide the thumb */
  }

  ::-webkit-scrollbar-track {
    background-color: transparent; /* Hide the track */
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.text};
  font-size: calc(1.6rem + 1vw);
  margin-bottom: 3rem;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Ubuntu Mono', monospace;
  font-weight: 900;
  z-index: 3;

  @media (max-width: 768px) {
    top: 8%;
    width: 90%; // Adjust as needed
    text-align: center;
    font-size: 2rem; // Adjust as needed
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    top: 5%;
  }
`;


const Icons = styled.div`
  display: inline-flex;
  margin-bottom: 3rem;
  align-items: center;
  position: absolute;
  top: 10rem;
  z-index: 3;
  a {
    &:not(:last-child) {
      margin-right: 2rem;
    }
    &:hover {
      filter: invert(20%);
      sepia(100%) saturate(300%) hue-rotate(180deg);
    }
  }
`;

const Form = styled.form`
  position: absolute;
  top: 17rem;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: #ffdce4;
    border: none;
    border-radius: 4px;
    &:active,
    &:focus {
      border: none;
      outline: none;
      background-color: #ffdce4;
    }
    &::placeholder {
      opacity: 0.8;
    }
    &[name="name"] {
      margin-right: 2rem;
    }
  }
  select{
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: #ffdce4;
    border: none;
    border-radius: 4px;
    &:active,
    &:focus {
      border: none;
      outline: none;
      background-color: #ffdce4;
    }
    &::placeholder {
      opacity: 0.8;
    }
  }
  textarea {
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: #ffdce4;
    border: none;
    border-radius: 4px;
    &:active,
    &:focus {
      border: none;
      outline: none;
      background-color: #ffdce4;
    }
    &::placeholder {
      opacity: 0.8;
    }
  }
  button {
    padding: 0.8rem 2rem;
    background-color: white;
    border-radius: 20px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem;
    
    align-items: center; // Add this line to center-align the form items
    
    input {
      width: 100%; // Make the inputs full width
    }
    select{
      width: 100%; 
    }
    
    textarea {
      width: 100%; // Make the textarea full width
    }
  }
`;

const Row = styled.div``;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;



const ContactPage = (props) => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('emailJS_9Nov', 'template_rvibaaa', formRef.current, '235kBciuzOsnSCVQD')
      .then(
        (result) => {
            console.log(result.text);
            // Display a success toast notification
            toast('Message successfully sent! Thank you for reaching out ❤', {
              position: "top-right",
              autoClose: 5000, // Close the notification after 5 seconds
            });
        },
        (error) => {
          console.log(error.text);
          toast.error('An error occurred while sending your message. Please try again later.', {
            position: "top-right",
            autoClose: 5000, // Close the notification after 5 seconds
          });
        }
      );
    e.target.reset();
  };

  return (
    <ThemeProvider theme={LightTheme}>
      <Box>
      <Container>
        <LogoComponent theme="light" />
        <SocialIcons theme="light" />
        <PowerButton />
        <CopyRight theme = 'light'/>
        <HamburgerMenu />
        <ContactSection>
          <Title>Get in Touch</Title>
          <Icons>
            <a href="https://github.com/SiowYenChong" target="_blank">
              <Github width={50} height={50} fill="black" />
            </a>
            <a href="https://www.linkedin.com/in/chong-siow-yen" target="_blank">
              <LinkedIn width={50} height={50} fill="black" />
            </a>
            <a href="mailto:Clairechong998@gmail.com" target="_blank">
              <Gmail width={50} height={50} fill="black" />
            </a>
          </Icons>
          <Form onSubmit={sendEmail} ref={formRef}>
            <Row>
              <input type="text" name="name" placeholder="Your name" required />
              <input type="email" name="email" placeholder="Your email" required />
            </Row>

          <label htmlFor="topics"></label>
            <select name="subject" id="topics">
              <option value="" disabled selected>Select a topic</option>
              <option value="Job Opportunity">Job Opportunity</option>
              <option value="Collaboration Opportunity">Collaboration Opportunity</option>
              <option value="Project help">Project/Tutoring help</option>
              <option value="Feedback">Feedback</option>
              <option value="Others">Others</option>
            </select>

            <textarea name="message" placeholder="Your message" cols="30" rows="7" required />

            <div style={{ margin: "0 auto" }}>
              <button type="submit">Submit</button>                
              <ToastContainer />
            </div>
          </Form>
        </ContactSection>
        <ParticleContainer>
          <CustomParticle />
        </ParticleContainer>
        <BigTitle text="CONTACT" top="75%" right="5%" />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ContactPage;
