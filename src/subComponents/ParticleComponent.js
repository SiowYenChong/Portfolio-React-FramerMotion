// Import necessary dependencies and particle configurations
import React from 'react';
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import configDark from '../config/particlesConfig';
import configLight from '../config/particlesConfigLight';
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too

// Styled component for the particle container
const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
`;

const ParticleComponent = (props) => {
    async function loadParticles(main) {
        await loadFull(main)
    }
  return (
    <ParticleContainer>
      <Particles
        id="tsparticles"
        init = {loadParticles}
        options={props.theme === 'light' ? configLight : configDark}
      />
    </ParticleContainer>
  );
};

export default ParticleComponent;
