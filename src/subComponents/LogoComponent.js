import React from 'react'
import styled from 'styled-components'
import { DarkTheme } from '../components/Theme'

const Logo = styled.h1`
    display: inline-block;
    color: ${props => props.color === 'dark' ? DarkTheme.text : DarkTheme.body};
    font-family: 'Pacifico', cursive;
    font-size: calc(1.2rem + 1vw);
    font-weight: 550;
    position: fixed;
    left: 2rem;
    top: 2rem;
    z-index: 3;
`

function LogoComponent(props) {
    return (
        <Logo color = {props.theme}>
            SiowYenChong
        </Logo>
    )
}

export default LogoComponent
