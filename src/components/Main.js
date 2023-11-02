import React from 'react';
import styled, {keyframes} from 'styled-components';
import PowerButton from '../subComponents/PowerButton';
import LogoComponent from '../subComponents/LogoComponent';
import Sociallcons from '../subComponents/Sociallcons';
import Intro from './Intro';
import { NavLink } from 'react-router-dom';
import { Heart } from './AllSvgs';
import { useState } from 'react';
import { motion } from 'framer-motion';

const MainContainer = styled.div`
  background: ${props => props.theme.body};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  h2, h2, h4, h5, h6 {
    font-family: 'Karla', sans-serif;
    font-weight: 500;
  }
`;

const Container = styled.div`
  padding: 2rem;
`;

const Contact = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  top: 2rem;
  right: calc(1rem + 2vw);
  text-decoration: none;
  z-index: 1;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.text};
  text-decoration: none;
`;

const BLOG = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  top: 45%;
  right: calc(1rem + 2vw);
  transform: rotate(90deg) translate(-50%, -50%);
  text-decoration: none;
  z-index: 1;
`;

const WORK = styled.a`
  color: ${props => props.click ? props.theme.body: props.theme.text};
  position: absolute;
  top: 45%;
  left : calc(1rem + 2vw);
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
    const handleClick = () => { 
        setClick(!click) 
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
                    <span>Click here</span>
                </Center>
            <Contact
            target="_blank"
            href="mailto:Clairechong998@gmail.com"
            >
                <motion.h2
                    whileHover = {{scale: 1.1}}
                    whileTap = {{scale: 0.9}}
                >
                    Contact me or drop by!
                </motion.h2>
            </Contact>
            <BLOG href="/blog">
                <motion.h2
                    whileHover = {{scale: 1.1}}
                    whileTap = {{scale: 0.9}}
                >
                    Blog
                </motion.h2>
            </BLOG>
            <WORK href="/work" click = {click}>
                <motion.h2
                        whileHover = {{scale: 1.1}}
                        whileTap = {{scale: 0.9}}
                    >
                    Work
                </motion.h2>
            </WORK>
            <BottomBar>
                <ABOUT href="/about" click = {click}>
                    <motion.h2
                        whileHover = {{scale: 1.1}}
                        whileTap = {{scale: 0.9}}
                    >
                        About me
                    </motion.h2>
                </ABOUT>
                <SKILLS href="/skills">
                    <motion.h2
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