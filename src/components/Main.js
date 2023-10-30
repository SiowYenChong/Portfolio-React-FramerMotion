import React from 'react';
import styled, {keyframes} from 'styled-components';
import PowerButton from '../subComponents/PowerButton';
import LogoComponent from '../subComponents/LogoComponent';
import Sociallcons from '../subComponents/Sociallcons';
import { NavLink } from 'react-router-dom';
import { Heart } from './AllSvgs';
import { useState } from 'react';

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
  top: 50%;
  right: calc(1rem + 2vw);
  transform: rotate(90deg) translate(-50%, -50%);
  text-decoration: none;
  z-index: 1;
`;

const WORK = styled.a`
  color: ${props => props.theme.text};
  position: absolute;
  top: 50%;
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
color: ${props => props.theme.text};
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

const Main = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => { 
        setClick(!click) 
    };

    return (
        <MainContainer>
        <Container>
            <PowerButton />
            <LogoComponent />
            <Sociallcons />
                <Center click = {click}>
                    <Heart onClick={()=>handleClick()} width={click? 120: 200} height={click? 120: 200} fill='currentColor' />
                    <span>Click here</span>
                </Center>
            <Contact
            target="_blank"
            href="mailto:Clairechong998@gmail.com"
            >
            <h2>Contact me or drop by!</h2>
            </Contact>
            <BLOG href="/blog">
            <h2>Blog</h2>
            </BLOG>
            <WORK href="/work">
            <h2>Work</h2>
            </WORK>
            <BottomBar>
                <ABOUT href="/about">
                    <h2>About Me</h2>
                </ABOUT>
                <SKILLS href="/skills">
                    <h2>My Skills</h2>
                </SKILLS>
            </BottomBar>
        </Container>
        </MainContainer>
    );
    };

export default Main;
