import React from 'react';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './Theme';
import styled from 'styled-components';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/Sociallcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';
import BigTitle from '../subComponents/BigTitle';
import './CareerPage.css';
import { Study, Work } from './AllSvgs';
import { Career } from '../data/CareerData';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${props => props.theme.body};
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1500px; 
  overflow-y: auto;
  padding: 10rem; 
  max-height: 90vh; 
`;

const SmallTimelineElement = styled(VerticalTimelineElement)`
  .vertical-timeline-element-content {
    padding: 1rem; 
  }
`;

const workStyle = { background: "#06D6A0" };
const studyStyle = { background: "#f9c74f" };

const CareerPage = () => {
  let workStyle = { background: "#06D6A0" };
  let studyStyle = { background: "#f9c74f" };

  return (
    <ThemeProvider theme={LightTheme}>
      <PageContainer>
        <ContentContainer>
          <LogoComponent theme="light" />
          <SocialIcons theme="light" />
          <PowerButton />
          <VerticalTimeline lineColor = "#ffdce4">
            {Career.map((element) => {
              let showButton =
                element.buttonText !== undefined &&
                element.buttonText !== null &&
                element.buttonText !== "";
              return (
                <SmallTimelineElement
                  key={element.id}
                  date={element.date}
                  dateClassName="date"
                  iconStyle={element.icon === "Work" ? workStyle : studyStyle}
                  icon={element.icon === "Work" ? <Work /> : <Study />}
                >
                  <h3 className="vertical-timeline-element-title">{element.title}</h3><br></br>
                  <h5 className="vertical-timeline-element-subtitle">{element.location}</h5>
                  <p id="description">{element.description}</p>
                  {showButton && (
                    <a className={`button ${element.icon === "Work" ? "workButton" : "studyButton"}`} href="/">
                      {element.buttonText}
                    </a>
                  )}
                </SmallTimelineElement>
              );
            })}
          </VerticalTimeline>
          <BigTitle text="CAREER" top="10%" right="5%" />
        </ContentContainer>
      </PageContainer>
    </ThemeProvider>
  );
};

export default CareerPage;
