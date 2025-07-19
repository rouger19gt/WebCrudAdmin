import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CrudAdminWebApp from './CrudAdminWebApp';
import { BrowserRouter } from 'react-router-dom';

import "./main.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CrudAdminWebApp />
    </BrowserRouter>
  </StrictMode>,
)
