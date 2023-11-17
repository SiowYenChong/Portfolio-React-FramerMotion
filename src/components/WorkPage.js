import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { DarkTheme } from './Theme';
import styled from 'styled-components';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/Sociallcons';
import PowerButton from '../subComponents/PowerButton';
import { Work } from '../data/WorkData';
import Card from '../subComponents/Card';
import { Heart } from './AllSvgs';
import BigTitle from '../subComponents/BigTitle';
import {motion} from 'framer-motion';
import HamburgerMenu from '../subComponents/HamburgerMenu';

const Box = styled.div`
    background-color: ${props => props.theme.body};
    height: 400vh;
    position: relative;
    display: flex;
    align-items: center;

`;
const Main = styled(motion.ul)`
    position: fixed;
    top: 15rem;
    left: calc(10rem + 15vw);
    height: 40vh;
    display: flex;
    color: #ff8fab;
    @media (max-width: 768px) {
        position: fixed;
        top: 20rem;
    }

`
const Rotate = styled.span`
    display: block;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    width: 80px;
    height: 80px;
    z-index: 1;
`
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
            duration: 0.5,
        }
    }
}

const WorkPage = () => {
    const ref = useRef(null);
    const heart = useRef(null);

    useEffect(() => {
        let element = ref.current;
        if (element) {
            const rotate = () => {
                element.style.transform = `translateX(${-window.pageYOffset}px)`;
                heart.current.style.transform = `rotate(` + -window.pageYOffset + `deg)`;
            };
            window.addEventListener('scroll', rotate);
            return () => window.removeEventListener('scroll', rotate);
        }
    }, [ref]);

    return (
        <ThemeProvider theme={DarkTheme}>
            <Box>
                <LogoComponent theme = 'dark'/>
                <SocialIcons theme = 'dark'/>
                <PowerButton/>
                <HamburgerMenu />
                    <Main ref = {ref} variants = {container} initial = 'hidden' animate = 'show'>
                        {
                            Work.map(d =>
                                <Card key = {d.id} data = {d}/>
                            )
                        }
                    </Main>
                    <Rotate ref = {heart}>
                        <Heart width = {80} height = {80} fill = {DarkTheme.text} />
                    </Rotate>
                    <BigTitle text = 'WORK' top = '10%' right = '20%'/>
            </Box>
        </ThemeProvider>
    );
};
export default WorkPage