import React from 'react';
import { ThemeProvider, keyframes } from 'styled-components';
import { DarkTheme } from './Theme';
import styled from 'styled-components';
import audifonos from '../assets/Images/Audifonos.png';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/Sociallcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';
import BigTitle from '../subComponents/BigTitle';

const Box = styled.div`
    background-color: ${props => props.theme.body};
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
`;

const float = keyframes`
    0% { transform: translateY(-10px); }
    50% { transform: translateY(15px) translateX(15px) }
    100% { transform: translateY(-10px); }
`

const AmongUs = styled.div`
    position: absolute;
    bottom: 20%;
    left: 3%;
    width: 40vw;
    animation: ${float} 4s ease infinite;
    img{
        width: 100%;
        height: auto;
    }
`;
const Main = styled.div`
    border: 2px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    padding: 2rem;
    width: 50vw;
    height: 50vh;
    z-index: 3;
    line-index: 1.5;
    display: flex;
    justofy-content: center;
    align-items: center;
    font-size: calc(0.6rem + 1vw);
    backdrop-filter: blur(4px);
    position: absolute;
    right: calc(5rem + 5vw);
    top: 10rem;
    font-family: 'Ubuntu Mono', monospace;
    font-style: italic; 
`

const AboutPage = () => {
    return (
        <ThemeProvider theme={DarkTheme}>
            <Box>
                <LogoComponent theme = 'dark'/>
                <SocialIcons theme = 'dark'/>
                <PowerButton/>
                <ParticleComponent theme = 'dark'/>
                <AmongUs>
                    <img src={audifonos} alt="audifonos" />
                </AmongUs>
                <Main>
                    I'm an upcoming Backend Software Engineer. <br /><br />
                    I am a fresh graduate in Software Engineering from UTAR. <br /><br />
                    I'm passionate about building innovative and useful software solutions and continuously learning in the process. <br /><br />
                    As a programming enthusiast, I enjoy tackling challenging problems and leveraging machine learning and reinforcement learning to enhance product and service performance. <br /><br />
                    Collaboration is important to me, and I relish working with other engineers and researchers to achieve our goals. <br /><br />
                </Main>
                <BigTitle text = 'ABOUT' top = '10%' left = '5%'/>
            </Box>
        </ThemeProvider>
    );
};


export default AboutPage