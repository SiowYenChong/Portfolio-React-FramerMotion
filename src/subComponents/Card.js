import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Github } from '../components/AllSvgs'
import { motion } from 'framer-motion'

const Box = styled(motion.li)`
    width: 16rem;
    height: 50vh;
    background-color: #ff8fab;
    color: ${props => props.theme.body}; 
    padding: 1.5rem 2rem;
    margin-right: 8rem;
    border-radius: 0 50px 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid ${props => props.theme.body};
    transition: all 0.2s ease;

    &:hover{
        background-color: ${props => props.theme.body};
        color: #ff8fab;
        border: 1px solid #ff8fab;

    }
    @media (max-width: 768px) {
        height: 45vh;
        width: 14rem;
        margin-right: 6rem;
    }
`
const Title = styled.h2`
    font-size: calc(0.8em + 0.5vw);
    font-weight: 800;
    @media (max-width: 768px) {
        font-size: calc(1.1em + 0.5vw);
    }
`

const Description = styled.h2`
    font-size: calc(0.6em + 0.3vw);
    font-family: 'Karla', sans-serif;
    font-weight: 500;
    @media (max-width: 768px) {
        font-size: calc(0.8em + 0.5vw);
        padding: 0.1rem;
    }
`

const Tags = styled.div`
    border-top: 2px solid ${props => props.theme.body};
    padding-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    ${Box}:hover &{
        border-top: 2px solid #ff8fab};

    }
`

const Tag = styled.span`
    margin-right: 1rem;
    font-size: calc(0.6em + 0.3vw);
    @media (max-width: 768px) {
        font-size: calc(0.65em + 0.5vw);
    }
`

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;

`
const Link = styled(NavLink)`
    background-color: ${props => props.theme.body};
    color: #ff8fab;
    text-decoration: none;
    padding: 0.5rem calc(1.5rem + 2vw);
    border-radius: 0 0 0 50px;
    font-size: calc(0.4em + 0.5vw);
    ${Box}:hover &{
        background-color: #ff8fab;
        color: ${props => props.theme.body};

    }
    @media (max-width: 768px) {
        font-size: calc(0.7em + 0.5vw);
    }
`
const Git = styled(NavLink)`
    color: inherit;
    text-decoration: none;
    ${Box}:hover &{
        &>*{
            fill: #ff8fab;
        }
    }
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

const Card = (props) => {

    const {id, name, description, tags, demo, github} = props.data;

    return (
        <Box key = {id} variants={Item}>
            <Title>{name}</Title>
            <Description>
                {description}
            </Description>
            <Tags>
            {
                tags.map((t,id) => {
                    return <Tag key={id}>#{t}</Tag>
                })
            }
            </Tags>
            <Footer>
                <Link to={demo} target="_blank">Visit</Link>
                <Git to={github} target="_blank">
                    <Github width={30} height={30} />
                </Git>
            </Footer>
        </Box>
    )
}

export default Card
