import React from 'react';
import ThemeProvider from './theme';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>   
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
