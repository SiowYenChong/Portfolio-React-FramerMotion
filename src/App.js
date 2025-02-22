import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './components/Theme';
import GlobalStyle from './globalStyles';
import ChatBot from './components/ChatBot';
import Main from './components/Main';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import WorkPage from './components/WorkPage';
import MySkillsPage from './components/MySkillsPage';
import ContactPage from './components/ContactPage';
import CareerPage from './components/CareerPage';
import { motion, AnimatePresence } from 'framer-motion';
import SoundBar from './subComponents/SoundBar';
import { Helmet } from 'react-helmet';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Routes location={location}>
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
  );
}

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SiowYenChong</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Siow Yen Chong" />
      </Helmet>

      <GlobalStyle />
      <ThemeProvider theme={LightTheme}>
        <SoundBar />
        <AnimatedRoutes />
        {/* ✅ ChatBot is placed LAST so it renders over all other elements */}
        <ChatBot />
      </ThemeProvider>
    </>
  );
}

export default App;
