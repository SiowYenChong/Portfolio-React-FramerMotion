import React from 'react';
import styled from 'styled-components';
import { PowerBtn } from '../components/AllSvgs';
import { NavLink } from 'react-router-dom';

const Power = styled.button`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;

  cursor: pointer;

  width: 45px; /* Increased width */
  height: 45px; /* Increased height */
  border-radius: 50%; /* Make it circular */
  
  &:hover {
    background-color: rgba(0, 255, 0, 0.4);
    box-shadow: 0 0 8px 6px rgba(0, 255, 0, 0.2);
  }
  & > *:first-child {
    text-decoration: none;
    color: inherit;
  }
  @media (max-width: 768px) {
    top: 2rem;
    left: 54%;
  }


`;

const PowerButton = () => {
  return (
    <Power>
      <NavLink to="/">
        <PowerBtn width={30} height={30} fill="currentColor" />
      </NavLink>
    </Power>
  );
};

export default PowerButton;
