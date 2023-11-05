import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './components/Theme';
import GlobalStyle from './globalStyles';

import Main from './components/Main';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import WorkPage from './components/WorkPage';
import MySkillsPage from './components/MySkillsPage';
import { AnimatePresence } from 'framer-motion';
import SoundBar from './subComponents/SoundBar';

function App() {
  const location = useLocation();
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={LightTheme}>
        <SoundBar />
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/skills" element={<MySkillsPage />} />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

const root = createRoot(document.getElementById('root'));

// Wrap your App component with the BrowserRouter
root.render(
  <Router>
    <App />
  </Router>
);

export default App;
