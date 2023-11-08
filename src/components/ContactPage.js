import React from 'react';
import { ThemeProvider, keyframes } from 'styled-components';
import { LightTheme, DarkTheme } from './Theme';
import styled from 'styled-components';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/Sociallcons';
import PowerButton from '../subComponents/PowerButton';
import CustomParticle from '../subComponents/CustomParticle';
import BigTitle from '../subComponents/BigTitle';
import { Github, LinkedIn, Gmail } from '../components/AllSvgs';


const Box = styled.div`
    background-color: ${props => props.theme.body};
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    z-index: 2; // Set a higher z-index for the Box component
`;

const ContactSection = styled.div`
    width: 100vw;
    padding: calc(2.5rem + 2.5vw) 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3; 
`
const Title = styled.h1`
    color: ${props => props.theme.text};
    width: 50vw;
    height: 50vh;
    font-size: calc(1.6rem + 1vw);
    margin-bottom: 3rem; 
    position: absolute;
    right: calc(3rem + 5vw);
    top: 10rem;
    font-family: 'Ubuntu Mono', monospace;
    font-weight: 900;
    z-index: 3;
`
const Icons = styled.div`
  display: inline-flex;
  margin-bottom: 3rem;
  align-items: center;
  position: absolute;
  top: 14rem;
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
    top: 20rem;
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    input{
        padding: 1rem calc(0.5rem + 1vw);
        margin-bottom: 1rem;
        background-color: #ff8fab;
        border: none;
        border-radius: 4px;
        &:active, &:focus{
            border: none;
            outline: none;
            background-color: #ff8fab;
        }
        &::placeholder{
            opacity: 0.8;
        }
        &[name="name"]{
            margin-right: 2rem;
        }
    }
    textarea{
        padding: 1rem calc(0.5rem + 1vw);
        margin-bottom: 1rem;
        background-color: #ff8fab;
        border: none;
        border-radius: 4px;
        &:active, &:focus{
            border: none;
            outline: none;
            background-color: #ff8fab;
        }
        &::placeholder{
            opacity: 0.8;
        }
    }
    button{
        padding: 0.8rem 2rem;
        background-color: white;
        border-radius: 20px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.2s;
        &:hover{
            transform: scale(1.1);
        }
        &:active{
            transform: scale(0.9);
        }
    }
`;

const Row = styled.div`

`

const ParticleContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; // Set a lower z-index for the ParticleComponent container
`;

const ContactPage = (props) => {
    return (
        <ThemeProvider theme={LightTheme}>
            <Box>
                <LogoComponent theme = 'light'/>
                <SocialIcons theme = 'light'/>
                <PowerButton/>
                    <ContactSection>
                        <Title>
                            Get in Touch
                        </Title>
                        <Icons>
                            <a href="https://github.com/SiowYenChong" target="_blank">
                            <Github width={50} height={50} fill='black' />
                            </a>
                            <a href="https://www.linkedin.com/in/chong-siow-yen" target="_blank">
                            <LinkedIn width={50} height={50} fill='black' />
                            </a>
                            <a href="mailto:Clairechong998@gmail.com" target="_blank">
                            <Gmail width={50} height={50} fill='black' />
                            </a>
                        </Icons>
                        <Form>
                            <Row>
                                <input type="text" name="name" placeholder="Your name" />
                                <input type="email" name="email" placeholder="Your email" />
                            </Row>
                            <textarea name="message" placeholder="Your message" cols="30" rows="8"></textarea>
                            <div style = {{margin: "0 auto"}}>
                                <button>Submit</button>
                            </div>
                        </Form>
                    </ContactSection>
                    <ParticleContainer>
                        <CustomParticle />
                    </ParticleContainer>
                <BigTitle text = 'CONTACT' top = '75%' right = '5%'/>
            </Box>
        </ThemeProvider>
    );
};


export default ContactPage