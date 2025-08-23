import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { OnboardingProvider } from "./state/OnboardingContext";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <OnboardingProvider>
                <App />
            </OnboardingProvider>
        </BrowserRouter>
    </React.StrictMode>
)
