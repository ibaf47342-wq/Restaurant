import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageAccueil from './Components/PageAccueil' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageAccueil />
  </StrictMode>,
)
