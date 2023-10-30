import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Github, LinkedIn, Gmail } from '../components/AllSvgs';
import { DarkTheme } from '../components/Theme';

const Line = styled.span`
  width: 2px;
  height: 8rem;
  background-color: ${props => props.color == 'dark' ? DarkTheme.text : DarkTheme.body};
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 2rem;
  z-index: 3;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialIconLink = styled.a`
  margin-bottom: 1rem; /* Add margin to create a gap between icons */
  text-decoration: none; /* Remove underline from links */
  color: inherit; /* Inherit text color from parent */
`;

function SocialIcons(props) {
  return (
    <Icons>
      <SocialIconsContainer>
        <SocialIconLink target="_blank" href="https://github.com/SiowYenChong">
          <Github width={25} height={25} fill={props.theme === 'dark' ? DarkTheme.text : DarkTheme.body} />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="https://www.linkedin.com/in/chong-siow-yen">
          <LinkedIn width={25} height={25} fill={props.theme === 'dark' ? DarkTheme.text : DarkTheme.body} />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="mailto:Clairechong998@gmail.com">
          <Gmail width={25} height={25} fill={props.theme === 'dark' ? DarkTheme.text : DarkTheme.body} />
        </SocialIconLink>
      </SocialIconsContainer>
      <Line color = {props.theme} />
    </Icons>
  );
}

export default SocialIcons;
