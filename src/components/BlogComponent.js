import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Box = styled(motion.create(NavLink))`
    width: calc(10rem + 15vw);
    text-decoration: none;
    height: 20rem;
    padding: 1rem;
    color: ${props => props.theme.text};
    border: 2px solid ${props => props.theme.text};
    backdrop-filter: blur(2px);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;

    display: flex;
    flex-direction: column;
    z-index: 5;

    &:hover {
        color: ${props => props.theme.body};
        background-color: #ff8fab;
        transition: all 0.3s ease;
    }

`;

const Image = styled.div`
    background-image: ${props => `url('${props.img}')`};
    width: 100%;
    height: 60%;
    background-size: cover;
    border: 1px solid transparent;
    background-position: center center;

    ${Box}:hover &{
        border: 1px solid ${props => props.theme.body};
    }
`;
const Title = styled.h3`
    color: inherit;
    padding: 0.5rem 0;
    padding-top: 1rem;
    font-family: 'Karla', sans-serif;
    font-size: calc(0.8em + 0.5vw);
    font-weight: 700;
    border-bottom: 1px solid ${props => props.theme.text};

    ${Box}:hover &{
        border-bottom: 1px solid ${props => props.theme.body};
    }

`
const HashTags = styled.div`
    padding: 0.5rem 0;
    display: flex;
    flex-wrap: wrap;

`
const Tag = styled.span`
    padding-right: 0.5rem;
    @media (max-width: 768px) {
        font-size: calc(0.7em + 0.5vw);
    }

`
const Date = styled.span`
    padding: 0.5rem 0;
`
const Container = styled(motion.div)`
`
const Item = {
    hidden: {
        scale: 0,
    },
    show: {
        scale: 1,
        transition: {
            type: 'spring',
            duration: 0.5,
        }
    }
}

const BlogComponent = (props) => {
    const { name, tags, date, imgSrc, link } = props.blog;
    return (
        <Container variants={Item}>
            <Box to={link} target="_blank">
            <Image img={imgSrc} />
            <Title>{name}</Title>
            <HashTags>
                {
                    tags.map((t,id) => {
                        return <Tag key={id}>#{t}</Tag>
                    })
                }
            </HashTags>
            <Date>
                {date}
            </Date>
            </Box>
        </Container>
        
    );
};

export default BlogComponent;
