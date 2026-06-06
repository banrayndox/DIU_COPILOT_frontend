import { StrictMode } from 'react'
import {BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import {
   ClerkProvider
} from "@clerk/clerk-react"

import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Clerk Publishable Key missing in .env")
}

createRoot(document.getElementById('root')).render(
<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
<BrowserRouter>
    <App />
</BrowserRouter>    
</ClerkProvider>

    ,
)
