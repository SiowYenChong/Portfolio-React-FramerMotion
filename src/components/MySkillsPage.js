import React from 'react';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './Theme';
import styled from 'styled-components';
import { Design, Develope } from './AllSvgs';
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
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Main = styled.div`
    border: 2px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.body};
    padding: 2rem;
    width: 30vw;
    height: 60vh;
    z-index: 3;
    cursor: pointer;
    line-height: 1.5;
    font-family: 'Ubuntu Mono', monospace;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
        color: ${props => props.theme.body};
        background-color: #ff8fab;
    }
`;

const Title = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(1em + 1vw);

    ${Main}:hover &{
        &>*{
            fill:${props => props.theme.body};
        }
    }
    &>*:first-child{
        margin-right: 1rem;
    }
`;

const Description = styled.div`
    color: ${props => props.theme.text};
    font-size: calc(0.1em + 1vw);
    padding: 0.5rem;
    ${Main}:hover &{
        color:${props => props.theme.body};
    }

    strong{
        margin-bottom: 1rem;
        text-transform: uppercase;
    }
    u1,p{
        margin-left: 2rem;
    }
    .two-column-list {
        display: flex;
        justify-content: space-between;
    }
    
    .left-column,
    .right-column {
        flex: 1;
        padding: 0 10px;
    }
`

const MySkillsPage = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <Box>
                <LogoComponent theme = 'light'/>
                <SocialIcons theme = 'light'/>
                <PowerButton/>
                <ParticleComponent theme = 'light'/>
                <Main>
                    <Title>
                        <Design width={40} height={40} /> &nbsp;Skills
                    </Title>
                    <Description>
                        <strong>What I know: </strong>
                        <ul>
                            <li>Software Management and Development</li>
                            <li>Cloud Engineering</li>
                            <li>Data Analysis</li>
                            <li>Machine Learning</li>
                            <li>System Design</li>
                            <li>Application Prototyping and Life Cycle Development</li>
                            <li>Mobile Application Development - Android</li>
                            <li>Backend System Development</li>
                        </ul>
                    </Description>
                    <Description>
                        <strong>TOOLS: </strong>
                        <div className="two-column-list">
                            <div className="left-column">
                                <ul>
                                    <li>Linux shell scripting</li>
                                    <li>Git</li>
                                    <li>Microsoft Office</li>
                                    <li>Figma</li>
                                    <li>Microsoft SQL Server</li>
                                </ul>
                            </div>
                            <div className="right-column">
                                <ul>
                                    <li>Glassfish</li>
                                    <li>OpenESB</li>
                                    <li>Eclipse</li>
                                    <li>Postman</li>
                                    <li>SoapUI</li>
                                </ul>
                            </div>
                        </div>
                    </Description>
                </Main>
                <Main>
                    <Title>
                        <Develope width={40} height={40} /> &nbsp;Programming Languages
                    </Title>
                    <Description>
                        <ul>
                        <strong>What I know: </strong>
                            <li>Python (Numpy, Scikit, Matplotlib, Pandas, OpenCV)</li>
                            <li>Java (Object-Oriented)</li>
                            <li>C++</li>
                            <li>PHP</li>
                            <li>Oracle SQL</li>
                            <li>MySQL</li>
                            <li>ReactJS</li>
                            <li>Mobile (React Native)</li>
                            <li>Web Development technologies (HTML, CSS, PHP, JavaScript)</li>
                            <li>Business Process Execution Language (BPEL)</li>
                            <li>Web Services Description Language (WSDL)</li>
                        </ul>
                    </Description>
                </Main>
                <BigTitle text = 'SKILLS' top = '80%' right = '30%'/>
            </Box>
        </ThemeProvider>
    );
};

export default MySkillsPage;
