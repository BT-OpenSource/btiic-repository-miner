import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const loadApplication = () => {

   const theme = createMuiTheme({
      palette: {
         primary: {
            light: '#fff',
            main: '#6300A9',
            dark: '#000'
         },
         secondary: {
            light: '#6300A9',
            main: '#fff',
            dark: '#000'
         },
      },
      typography: {
         useNextVariants: true
      }
   });


   ReactDOM.render(
      <MuiThemeProvider theme={theme}>
         <App />
      </MuiThemeProvider>,
      document.getElementById('root')
   );
}

// Load the application config and then kick-off loading the application
const bootstrapEnv = async (loadAppFunc) => {

   // Load the cofiguration file
   let response = await (await fetch(`/config.json`)).json();

   // Mount the config on process.env
   process.env = Object.assign(process.env, response);

   // Launch the application
   loadAppFunc();

}

bootstrapEnv(loadApplication);
