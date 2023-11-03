import React from 'react';
import { ThemeProvider, keyframes } from 'styled-components';
import { DarkTheme } from './Theme';
import styled from 'styled-components';
import audifonos from '../assets/Images/Audifonos.png';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/Sociallcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';


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
    left: 5%;
    width: 40vw;
    animation: ${float} 4s ease infinite;
    img{
        width: 100%;
        height: auto;
    }
`;

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
            </Box>
        </ThemeProvider>
    );
};


export default AboutPage