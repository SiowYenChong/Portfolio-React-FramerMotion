import React, {useState} from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './components/Theme';
import GlobalStyle from './globalStyles';
import Main from './components/Main';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import WorkPage from './components/WorkPage';
import MySkillsPage from './components/MySkillsPage';
import ContactPage from './components/ContactPage';
import CareerPage from './components/CareerPage';
import { AnimatePresence, motion } from 'framer-motion';
import SoundBar from './subComponents/SoundBar';

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={LightTheme}>
        
        <AnimatePresence>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Main />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="career" element={<CareerPage />} />
              <Route path="work" element={<WorkPage />} />
              <Route path="skills" element={<MySkillsPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
      <SoundBar />
    </>
  );
}

export default App;
