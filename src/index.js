import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles/index';

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_vn from "../src/translations/vn/common.json";
import common_en from "../src/translations/en/common.json";


i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'vn',                              // language to use
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    vn: {
      common: common_vn
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <I18nextProvider i18n={i18next}>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </I18nextProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
