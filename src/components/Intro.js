import React from 'react'
import styled from 'styled-components'
import Me from '../assets/Images/profile-img.jpg'
import {motion} from 'framer-motion'
import { useTypingEffect } from '../subComponents/TypingEffect';


const Box = styled(motion.div)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 65vw;
    height: 55vh;
    display: flex;
    background: 
        linear-gradient(
            to right,
            ${props => props.theme.body} 50%,
            ${props => props.theme.text} 50%) bottom,
            linear-gradient(
            to right,
            ${props => props.theme.body} 50%,
            ${props => props.theme.text} 50%) top;
            background-repeat: no-repeat;
    background-size: 100% 2px;
        border-left: 2px solid ${props => props.theme.body};
        border-right: 2px solid ${props => props.theme.text};
        
    z-index: 1;
    @media (max-width: 768px) {
        transform: translate(-50%, -50%) rotate(90deg) scale(0.55); 
        width: 105vh; 
        height: 65vw;
        left: 50%; 
        top: 50%; 
        transform-origin: center center; 
    }
`;


const SubBox = styled.div`
    width: 50%;
    position: relative;
    display: flex;

    .pic{
        position:absolute;
        bottom:0;
        left: 50;
        transform: translate(-50%, 0%);
        width: 75%;
        height: auto;
        @media (max-width: 768px) {
            width: 100%;
            height: auto;
        }
    }
    @media (max-width: 768px) {
        /* Rotate 90 degrees anticlockwise for screens 768px and below */
        transform: rotate(-90deg);
        transform-origin: center center;
    
        .pic {
          width: 100%;
          height: auto;
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
    }
`

const Text = styled.div`
    font-size: calc(1.5em + 1.5vw);
    color: ${props => props.theme.body};
    font-family: 'Pacifico';
    padding: 2rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    & > *:last-child {
        color: ${props => `rgba(${props.theme.bodyRgba},0.6)`};
        font-size: calc(0.5rem + 1.5vw);
        font-weight: 300;
        @media (max-width: 768px) {
            font-size: calc(2.0rem + 1.5vw);
        }
    }

    @media (max-width: 768px) {
        font-size: calc(4.0rem + 1.5vw);
        max-width: 100%; 
        overflow: hidden;
    }
`;

const Intro = () => {
    const [typingText, isCursorVisible] = useTypingEffect("I'm Siow Yen", 500);
    return (
        <Box
            initial={{ height: 0 }}
            animate={{ height: "55vh" }}
            transition={{ type: 'spring', duration: 2, delay: 1 }}
        >
            <SubBox>
                <Text>
                    Hi,
                    <br /> {typingText}
                    <h6>I code and design
                    <br /> websites 
                    <br /> and apps</h6>
                </Text>
            </SubBox>
            <SubBox>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    <img className = "pic" src={Me} alt="Profile Pic" />
                </motion.div>
            </SubBox>
        </Box>
    )
}

export default Intro
