import React from 'react';
import styled from 'styled-components';
import { Github, LinkedIn, Gmail } from '../components/AllSvgs';

const Line = styled.span`
  width: 2px;
  height: 8rem;
  background-color: ${props => props.theme.text};
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

function SocialIcons() {
  return (
    <Icons>
      <SocialIconsContainer>
        <SocialIconLink target="_blank" href="https://github.com/SiowYenChong">
          <Github width={25} height={25} fill="currentColor" />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="https://www.linkedin.com/in/chong-siow-yen">
          <LinkedIn width={25} height={25} fill="currentColor" />
        </SocialIconLink>
        <SocialIconLink target="_blank" href="mailto:Clairechong998@gmail.com">
          <Gmail width={25} height={25} fill="currentColor" />
        </SocialIconLink>
      </SocialIconsContainer>
      <Line />
    </Icons>
  );
}

export default SocialIcons;
