// Import necessary dependencies and particle configuration
import React from 'react';
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import particleConfig from '../config/particlesConfigCustom'; // Import your common particle configuration
import { loadFull } from "tsparticles";

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
`;

const ParticleComponent = () => {
    async function loadParticles(main) {
        await loadFull(main)
    }
  return (
    <ParticleContainer>
      <Particles
        id="tsparticles"
        init = {loadParticles}
        options={particleConfig} // Use the common particle configuration
        style={{ position: 'absolute', top: 0 }}
      />
    </ParticleContainer>
  );
};

export default ParticleComponent;
