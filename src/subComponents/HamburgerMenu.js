import React, {useState} from 'react'
import styled from 'styled-components'
import './HamburgerMenu.css'
import { NavLink } from 'react-router-dom'

const COLORS = {
    primaryDark: '#ff5c85',
    primaryLight: '#ffa9be',
}

const MenuLabel = styled.label`
    background-color: ${COLORS.primaryLight};
    position: fixed;
    top: 6.5rem; 
    right: 2rem;
    border-radius: 50%;
    height: 4rem; 
    width: 4rem;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
    text-align: center;
`;

const NavBackground = styled.div`
    position: fixed;
    top: 7.0rem; 
    right: 2.5rem;
    background-image: radial-gradient(${COLORS.primaryDark}, ${COLORS.primaryLight});
    height: 3rem; 
    width: 3rem; 
    border-radius: 50%;

    transform: ${(props) => (props.clicked ? 'scale(80)' : 'scale(0)')};
    transition: transform 2s;
    z-index: 500;
`;

const Icon = styled.span`
    position: relative;
    background-color: ${(props) => (props.clicked ? 'transparent' : 'black')};
    width: 2rem; 
    height: 1px;
    display: inline-block;
    margin-top: 2.1rem; 
    transition: all 0.2s;

    &::before,
    &::after {
        content: '';
        background-color: black;
        width: 2rem; 
        height: 1px; 
        display: inline-block;
        position: absolute;
        left: 0;
        transition: all 0.3s;
    }

    &::before {
        top: ${(props) => (props.clicked ? '0' : '-0.4rem')}; 
        transform: ${(props) => (props.clicked ? 'rotate(135deg)' : 'rotate(0)')};
    }

    &::after {
        top: ${(props) => (props.clicked ? '0' : '0.4rem')}; /* Adjusted from 0.8rem */
        transform: ${(props) => (props.clicked ? 'rotate(-135deg)' : 'rotate(0)')};
    }
`;

const Navigation = styled.div`
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 600;
    width: ${(props) => (props.clicked ? '100%' : '0')};
    opacity: ${(props) => (props.clicked ? '1' : '0')};

    transition: width 0.8s;
`;

const List = styled.ul`
    position: absolute;
    list-style: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
`;

const ItemLink = styled(NavLink)`
    display: inline-block;
    font-size: 2.5rem; 
    font-weight: 300;
    text-decoration: none;
    color: ${COLORS.primaryLight};
    padding: 1rem 2rem; 
    background-image: linear-gradient(
        120deg,
        transparent 0%,
        transparent 50%,
        transparent 0%,
        #fff 50%
    );
    background-size: 240%;
    transition: all 0.4s;

    &:hover,
    &:active {
        background-position: 100%;
        color: ${COLORS.primaryDark};
        transform: translateX(0.5rem); /* Adjusted from 1rem */
    }
`;
function HamburgerMenu() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    return (
        <>
            <MenuLabel htmlFor = "navi-toggle" onClick = {handleClick}>
                <Icon clicked = {click}>&nbsp;</Icon>
            </MenuLabel>
            <NavBackground clicked = {click}>&nbsp;</NavBackground>
            <Navigation clicked = {click}>
                <List>
                    <li>
                        <ItemLink onClick = {handleClick} to = "/about">
                            About Me
                        </ItemLink>
                    </li>
                    <li>
                        <ItemLink onClick = {handleClick} to = "/blog">
                            Blog
                        </ItemLink>
                    </li>
                    <li>
                        <ItemLink onClick = {handleClick} to = "/career">
                            Career
                        </ItemLink>
                    </li>
                    <li>
                        <ItemLink onClick = {handleClick} to = "/contact">
                            Contact Me
                        </ItemLink>
                    </li>
                    <li>
                        <ItemLink onClick = {handleClick} to = "/skills">
                            My Skills
                        </ItemLink>
                    </li>
                    <li>
                        <ItemLink onClick = {handleClick} to = "/work">
                            Work
                        </ItemLink>
                    </li>
                </List>
            </Navigation>
        </>
    )
}

export default HamburgerMenu
