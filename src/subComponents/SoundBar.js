import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import music from '../assets/audio/u-said-it-v13-1167.mp3';

const Box = styled.div`
  display: flex;
  cursor: pointer;
  position: fixed;
  left: 15rem; 
  top: 3rem;   
  z-index: 10;

  @media (max-width: 768px) {
    top: 6rem;
    left: 2rem; 
  }

  & > *:nth-child(1) {
    animation-delay: 0.2s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.3s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.4s;
  }
  & > *:nth-child(4) {
    animation-delay: 0.5s;
  }
  & > *:nth-child(5) {
    animation-delay: 0.8s;
  }
`;

const play = keyframes`
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(2);
  }
  100% {
    transform: scaleY(1);
  }
`;

const Line = styled.span`
  background: ${(props) => (props.theme === 'dark' ? props.theme.text : props.theme.body)};
  border: 1px solid ${(props) => (props.theme === 'dark' ? props.theme.body : props.theme.text)};
  animation: ${play} 1s ease infinite;
  animation-play-state: ${(props) => (props.isPlaying ? 'running' : 'paused')};
  height: 1rem;
  width: 2px;
  margin: 0 0.1rem;
`;

const SoundBar = () => {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(
    () => localStorage.getItem('isPlaying') === 'true'
  );

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = ref.current;

    if (audio) {
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error('Audio playback failed:', error);
        });
      } else {
        audio.pause();
      }
      localStorage.setItem('isPlaying', isPlaying);
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = ref.current;
    if (audio) {
      if (isPlaying) {
        audio.currentTime = parseFloat(localStorage.getItem('audioTime')) || 0;
        audio.play().catch((error) => {
          console.error('Audio playback failed:', error);
        });
      }
    }
  }, [isPlaying]);

  return (
    
    <Box onClick={togglePlayback}>
      <Line isPlaying={isPlaying} />
      <Line isPlaying={isPlaying} />
      <Line isPlaying={isPlaying} />
      <Line isPlaying={isPlaying} />
      <Line isPlaying={isPlaying} />
      <audio
        src={music}
        ref={ref}
        loop
        onTimeUpdate={(e) => {
          localStorage.setItem('audioTime', e.target.currentTime);
        }}
      />
    </Box>
  );
};

export default SoundBar;
