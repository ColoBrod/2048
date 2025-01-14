import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Styles:
import 'normalize.css';
import './index.css'

createRoot(document.getElementById('root')!).render(<App />);
