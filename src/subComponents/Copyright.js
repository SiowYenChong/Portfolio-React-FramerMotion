import React from 'react';
import styled from 'styled-components';
import { DarkTheme } from '../components/Theme';

const CopyRightContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1rem;
  font-size: 14px;
  color: ${props => props.color === 'dark' ? DarkTheme.text : DarkTheme.body};
  z-index: 3;
`;

function CopyRight(props) {
  return (
    <CopyRightContainer color = {props.theme} >
      © Chong Siow Yen 2024
    </CopyRightContainer>
  );
};

export default CopyRight;
