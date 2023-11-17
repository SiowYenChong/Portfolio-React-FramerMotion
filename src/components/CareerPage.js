import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './Theme';
import styled from 'styled-components';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/Sociallcons';
import PowerButton from '../subComponents/PowerButton';
import BigTitle from '../subComponents/BigTitle';
import { Study, Work } from './AllSvgs';
import { Career } from '../data/CareerData';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Button from 'react-bootstrap/Button';
import CareerModal from '../subComponents/CareerModal';
import './CareerPage.css';
import HamburgerMenu from '../subComponents/HamburgerMenu';

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1500px;
  overflow-y: auto;
  padding: 2rem;
  max-height: 90vh;
  @media (max-width: 768px) {
    padding: 3rem;
}
`;

const SmallTimelineElement = styled(VerticalTimelineElement)`
  .vertical-timeline-element-content {
    padding: 1rem;
  }
`;

const CenteredHeading = styled.h1`
  text-align: center;
  margin: 2rem auto; /* Add auto margin to center the heading */
  color: ${props => props.theme.text};
`;


const workStyle = { background: "#C99EFD" };
const studyStyle = { background: "#60AADB" };

const CareerPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const handleModalShow = (title, content) => {
    setModalContent({ title, content });
    setModalShow(true);
  }

  const handleModalHide = () => {
    setModalShow(false);
  }

  return (
    <ThemeProvider theme={LightTheme}>
      <PageContainer>
        <ContentContainer>
          <LogoComponent theme="light" />
          <SocialIcons theme="light" />
          <PowerButton />
          <HamburgerMenu />
          <CenteredHeading></CenteredHeading>
          <VerticalTimeline>
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
                    <Button
                      className={`button ${element.icon === "Work" ? "workButton" : "studyButton"}`}
                      variant="primary"
                      onClick={() => handleModalShow(element.title, <iframe title="Document" src={element.link} width="100%" height="500px" />)}
                    >
                      {element.buttonText}
                    </Button>
                  )}
                </SmallTimelineElement>
              );
            })}
          </VerticalTimeline>
          <BigTitle text="CAREER" top="10%" right="5%" />
        </ContentContainer>
      </PageContainer>
      <CareerModal show={modalShow} onHide={handleModalHide} title={modalContent.title} content={modalContent.content} />
    </ThemeProvider>
  );
};

export default CareerPage;
