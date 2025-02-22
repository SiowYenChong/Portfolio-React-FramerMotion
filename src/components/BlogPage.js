import React from 'react'
import styled from 'styled-components'
import img from '../assets/Images/background-design.jpg'
import PowerButton from '../subComponents/PowerButton';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/Sociallcons';
import { Blogs } from '../data/BlogData';
import BlogComponent from './BlogComponent';
import AnchorComponent from '../subComponents/Anchor';
import { Anchor } from './AllSvgs';
import { useState } from 'react';
import { useEffect } from 'react';
import BigTitle from '../subComponents/BigTitle';
import { motion } from 'framer-motion';
import ChatBot from '../components/ChatBot';

import HamburgerMenu from '../subComponents/HamburgerMenu';
import CopyRight from '../subComponents/Copyright';

const MainContainer = styled(motion.div)`
    background-image: url(${img});
    background-size: cover;  
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    min-height: 100vh;  
`;

const Container = styled.div`
    background-color: ${props => `rgba(${props.theme.bodyRgba}, 0.8)`};
    width: 100%;
    min-height: 100vh;
    position: relative;
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10rem;

`
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
    grid-gap: calc(1rem + 2vw);
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
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



const BlogPage = () => {
    const [numbers, setNumbers] = useState(0);
    useEffect(() => {
        let num = (window.innerHeight - 70)/30;
        setNumbers(parseInt(num));

    },[])

    return(
        <MainContainer
            variants = {container}
            initial = 'hidden'
            animate = 'show'
            exit = {{
                opacity: 0,
                transition: { duration: 0.5 },
            
            }}
        >
            <Container>
                <LogoComponent />
                <PowerButton />
                <CopyRight />
                <HamburgerMenu />
                <SocialIcons />
                <AnchorComponent numbers={numbers}/>
                    <Center>
                        <Grid>
                            {
                                Blogs.map(blog=>{
                                    return <BlogComponent key = {blog.id} blog = {blog} />

                                })
                            }
                        </Grid>
                    </Center>
                    <BigTitle text = 'BLOG' top = '5rem' left = '5rem'/>
            </Container>
            <ChatBot />
        </MainContainer>

    )
}
export default BlogPage