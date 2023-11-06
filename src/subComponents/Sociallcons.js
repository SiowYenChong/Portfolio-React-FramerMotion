import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Github, LinkedIn, Gmail } from '../components/AllSvgs';
import { DarkTheme } from '../components/Theme';
import { motion } from 'framer-motion';

const Line = styled(motion.span)`
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

const SocialIconLink = styled(motion.a)`
  margin-bottom: 1rem; /* Add margin to create a gap between icons */
  text-decoration: none; /* Remove underline from links */
  color: inherit; /* Inherit text color from parent */
`;

function SocialIcons(props) {
  return (
    <Icons>
    <SocialIconsContainer>
      <SocialIconLink
        initial={{ scale: 1 }} // Start with a scale of 1
        animate={{ scale: [0, 1, 1.5, 1] }} // Animation when mounted
        transition={{ type: 'spring', duration: 1, delay: 1 }}
        target="_blank"
        href="https://github.com/SiowYenChong"
      >
        <Github width={25} height={25} fill={props.theme === 'dark' ? DarkTheme.text : DarkTheme.body} />
      </SocialIconLink>
      <SocialIconLink
        initial={{  scale: 1 }} 
        animate={{ scale: [0,1,1.5,1] }} 
        transition={{ type:'spring', duration: 1, delay:1.4 }}
        target="_blank"
        href="https://www.linkedin.com/in/chong-siow-yen"
      >
        <LinkedIn width={25} height={25} fill={props.theme === 'dark' ? DarkTheme.text : DarkTheme.body} />
      </SocialIconLink>
      <SocialIconLink
        initial={{ scale: 1 }} 
        animate={{ scale: [0,1,1.5,1] }} 
        transition={{ type:'spring', duration: 1, delay:1.6 }}
        target="_blank"
        href="mailto:Clairechong998@gmail.com"
      >
        <Gmail width={25} height={25} fill={props.theme === 'dark' ? DarkTheme.text : DarkTheme.body} />
      </SocialIconLink>
    </SocialIconsContainer>
      <Line color = {props.theme} 
        initial={{ 
          height:0,
        }}
        animate={{
          height: '8rem',
        }}
        transition={{
          type: 'spring',
          duration: 1,
          delay: 0.8,
        }}
      />
    </Icons>
  );
}

export default SocialIcons;
