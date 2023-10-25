import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from './components/Theme';
import GlobalStyle from './globalStyles';

import Main from './components/Main';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import WorkPage from './components/WorkPage'; // Assuming WorkPage and MySkillsPage are separate components
import MySkillsPage from './components/MySkillsPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={LightTheme}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/skills" element={<MySkillsPage />} />
        </Routes>
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
