import React from 'react';
import ThemeProvider from './theme';
import Router from './routes';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
function App() {
  return (
    <div className="App">
      
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />      
        </ThemeProvider>
    </div>
  );
}

export default App;
