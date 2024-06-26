import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './hooks/theme';
import { AuthProvider } from './hooks/auth';

import App from './App'

import dark from './styles/themes/dark';

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
      <ThemeProvider theme={dark} toggleTheme={()=>{}}>
         <AuthProvider>
            <App />
         </AuthProvider>
      </ThemeProvider>
   </React.StrictMode>
);
