import React, { useState }  from 'react';
import styled, {keyframes} from 'styled-components';
import PowerButton from '../subComponents/PowerButton';
import LogoComponent from '../subComponents/LogoComponent';
import Sociallcons from '../subComponents/Sociallcons';
import Intro from './Intro';
import { Heart } from './AllSvgs';

import { motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const MainContainer = styled.div`
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  h2, h3, h4, h5, h6 {
    font-family: 'Karla', sans-serif;
    font-weight: 500;
    font-size: calc(0.5em + 1vw);
    @media (max-width: 768px) {
        font-size: calc(0.65em + 1vw);
    }
  }
`;

const Container = styled.div`
  padding: 2rem;
`;

const ResumeContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1;
  display: inline-block;

  @media (max-width: 768px) {
    top: 2rem;
    right: 0.8rem;
  }
`;

const ResumeButton = styled(motion.div)`
  background-color: #ff8fab;
  color: ${props => props.theme.body};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const ResumeText = styled.h2`
  font-family: 'Karla', sans-serif;
  font-size: calc(0.5em + 0.7vw);
  font-weight: 300;
  transition: color 0.3s;
`;

const Contact = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  top: 5.8rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index: 1;

  @media (max-width: 768px) {
    top: 4.6rem;
    right: calc(0.5rem + 2vw);
  }
`;

const BLOG = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  top: 40%;
  right: calc(1rem + 2vw);
  transform: rotate(90deg) translate(-50%, -50%);
  text-decoration: none;
  z-index: 1;
`;

const CAREER = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  bottom: 16%;
  right: calc(1rem + 2vw);
  transform: rotate(90deg) translate(-50%, -50%);
  text-decoration: none;
  z-index: 1;
  @media (max-width: 768px) {
    bottom: 26%;
  }
`;

const WORK = styled.a`
  color: ${props => props.click ? props.theme.body: props.theme.text};
  position: absolute;
  top: 40%;
  left : calc(1.8rem + 2vw);
  transform: translate(-50%, -50%) rotate(-90deg) ;
  text-decoration: none;
  z-index: 1;
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 1rem;
  left:0;
  right:0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    bottom: 4.5rem;
  }
`;

const ABOUT = styled.a`
color: ${props => props.click ? props.theme.body: props.theme.text};
text-decoration: none;
z-index: 1;

`;

const SKILLS = styled.a`
color: ${props => props.theme.text};
text-decoration: none;
z-index: 1;
`;

const rotate = keyframes`
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
`;

const Center = styled.button`
    position: absolute;
    top: ${props => (props.click ? '85%' : '50%')};
    left: ${props => (props.click ? '92%' : '50%')};
    transform: translate(-50%, -50%);
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 1s ease;

    &>:first-child {
        animation: ${rotate} infinite 1.5s linear ;
    }

    &>:last-child {
        display: ${props => (props.click ? 'none' : 'inline-block')};
        padding-top: 1rem;
    }
    span{
        font-family: 'Karla', sans-serif;
        font-size: calc(0.6em + 1vw);
        font-weight: 500;
        @media (max-width: 768px) {
            font-size: calc(0.8em + 1vw);
        }
    }
`
const RedDiv = styled.div`
    position: absolute;
    top: 0;
    // background-color: #000000;
    background-color: #ff8fab; 
    bottom: 0;
    right: 50%;
    width: ${props => (props.click ? '50%' : '0%')};
    height: ${props => (props.click ? '100%' : '0%')};
    z-index: 1;
    transition: height 0.5s ease, width 1s ease 0.5s;
`;


const Main = () => {
    const [click, setClick] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
      setClick(!click);
    };
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };

    return (
        <MainContainer>
        <Container>
            <PowerButton />
            <LogoComponent theme = { click ? 'dark' : 'light'}/>
            <Sociallcons theme = { click ? 'dark' : 'light'}/>
            <RedDiv click = {click}/>
                <Center click = {click}>
                    <Heart onClick={()=>handleClick()} width={click? 120: 200} height={click? 120: 200} fill='currentColor' />
                    <span>Click the heart </span>
                </Center>

                <ResumeContainer>
                    <motion.h2
                    initial={{
                        y: -200,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                    }}
                    animate={{
                        y: 0,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                        <ResumeButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={openModal}
                        >
                        <ResumeText>View my resume</ResumeText>
                        </ResumeButton>
                    </motion.h2>
                </ResumeContainer>

                <Modal show={showModal} onHide={closeModal} size="lg">
                        <Modal.Header closeButton>
                        <Modal.Title><h1>Resume</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <iframe
                            title="Resume"
                            src="https://drive.google.com/file/d/1296fS-8FiNRE3XWdZ77dGEWPU_5z6uUj/preview"
                            width="100%"
                            height="500px"
                        />
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>

            <Contact href="/contact"
            >
            <motion.h2
                initial={{
                    y: -200,
                    transition: { type: 'spring', duration: 1.5, delay: 1 },
                }}
                animate={{
                    y: 0,
                    transition: { type: 'spring', duration: 1.5, delay: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                Contact me or drop by!
            </motion.h2>
            </Contact>
            <BLOG href="/blog">
                <motion.h2
                    initial={{
                        y: -200,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                    }}
                    animate={{
                        y: 0,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                    }}
                    whileHover = {{scale: 1.1}}
                    whileTap = {{scale: 0.9}}
                >
                    Blog
                </motion.h2>
            </BLOG>
            <CAREER href="/career">
                <motion.h2
                    initial={{
                        y: -200,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                    }}
                    animate={{
                        y: 0,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                    }}
                    whileHover = {{scale: 1.1}}
                    whileTap = {{scale: 0.9}}
                >
                    Career
                </motion.h2>
            </CAREER>
            <WORK href="/work" click = {click}>
                <motion.h2
                        initial={{
                            y: -200,
                            transition: { type: 'spring', duration: 1.5, delay: 1 },
                        }}
                        animate={{
                            y: 0,
                            transition: { type: 'spring', duration: 1.5, delay: 1 },
                        }}
                        whileHover = {{scale: 1.1}}
                        whileTap = {{scale: 0.9}}
                    >
                    Work
                </motion.h2>
            </WORK>
            <BottomBar>
                <ABOUT href="/about" click = {click}>
                    <motion.h2
                        initial={{
                            y: 200,
                            transition: { type: 'spring', duration: 1.5, delay: 1 },
                        }}
                        animate={{
                            y: 0,
                            transition: { type: 'spring', duration: 1.5, delay: 1 },
                        }}
                        whileHover = {{scale: 1.1}}
                        whileTap = {{scale: 0.9}}
                    >
                        About me
                    </motion.h2>
                </ABOUT>
                <SKILLS href="/skills">
                    <motion.h2
                            initial={{
                                y: 200,
                                transition: { type: 'spring', duration: 1.5, delay: 1 },
                            }}
                            animate={{
                                y: 0,
                                transition: { type: 'spring', duration: 1.5, delay: 1 },
                            }}
                            whileHover = {{scale: 1.1}}
                            whileTap = {{scale: 0.9}}
                    >
                        My Skills
                    </motion.h2>
                </SKILLS>
            </BottomBar>
        </Container>
        {click ? <Intro click = {click}/>: null}
        </MainContainer>
    );
    };

export default Main;
