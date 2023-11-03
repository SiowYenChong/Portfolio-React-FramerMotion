import React from 'react';
import { ThemeProvider } from 'styled-components';
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

// const float = keyframes`

// `

const AmongUs = styled.div`
    position: absolute;
    bottom: 10%;
    left: 5%;
    width: 40vw;

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