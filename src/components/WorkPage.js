import React, { useEffect, useRef, useState } from 'react';
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
import { motion, useAnimation } from 'framer-motion';
import HamburgerMenu from '../subComponents/HamburgerMenu';
import CopyRight from '../subComponents/Copyright';
import ChatBot from '../components/ChatBot';

const Box = styled.div`
    background-color: ${props => props.theme.body};
    height: 100vh; // Make height equal to viewport height
    overflow: hidden; // Hide scrollbars
    position: relative;
    display: flex;
    align-items: center;
`;

const Main = styled(motion.ul)`
    position: absolute; // Use absolute to position it correctly within Box
    top: 50%; // Center vertically
    left: 0; // Start from the left
    height: auto; // Remove fixed height to allow proper flex layout
    display: flex;
    flex-direction: row; // Arrange cards horizontally
    color: #ff8fab;
    transform: translateY(-50%); // Center the component vertically
`;

const Rotate = styled.span`
    display: block;
    position: fixed;
    right: 1rem;
    bottom: 3rem;
    width: 80px;
    height: 80px;
    z-index: 1;
`;

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
            duration: 0.5,
        },
    },
};

const WorkPage = () => {
    const ref = useRef(null);
    const heart = useRef(null);
    const controls = useAnimation();
    const [offsetX, setOffsetX] = useState(0); // State to store horizontal offset
    const [rotation, setRotation] = useState(0); // State to store heart rotation

    useEffect(() => {
        controls.start('show');
    }, [controls]);

    // Function to handle scroll
    const handleScroll = (event) => {
        event.preventDefault(); // Prevent default scroll behavior
        const delta = event.deltaY; // Get the scroll delta
        setOffsetX(prevOffsetX => prevOffsetX - delta); // Update offset based on scroll delta
        setRotation(prevRotation => prevRotation + delta * 0.2); // Update rotation based on delta
    };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (ref.current) {
            // Smoothly set the transform based on the offset
            ref.current.style.transform = `translateY(-50%) translateX(${offsetX}px)`;
        }
        if (heart.current) {
            // Rotate heart icon smoothly
            heart.current.style.transform = `rotate(${rotation}deg)`;
        }
    }, [offsetX, rotation]); // Trigger update when offsetX or rotation changes

    return (
        <ThemeProvider theme={DarkTheme}>
            <Box>
                <LogoComponent theme='dark' />
                <SocialIcons theme='dark' />
                <PowerButton />
                <CopyRight theme='dark' />
                <HamburgerMenu />
                <Main
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={container}
                >
                    {Work.map(d => (
                        <Card key={d.id} data={d} />
                    ))}
                </Main>
                <Rotate ref={heart}>
                    <Heart width={80} height={80} fill={DarkTheme.text} />
                </Rotate>
                <BigTitle text='WORK' top='10%' right='20%' />
            </Box>
            <ChatBot />
        </ThemeProvider>
    );
};

export default WorkPage;
