import { Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"

import NotHuman from "./components/NotHuman"
import Auth from "./pages/Auth"
import FAQPage from "./pages/FAQPage"
import Feedback from "./components/Feedback"
import Apply from "./pages/Apply"
import Chatbot from "./pages/ChatBot"
import ProtectedDIU from "./components/ProtectedDIU"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import {
  SignedIn,
  SignedOut,
  useAuth
} from "@clerk/clerk-react"


export const App = () => {
  const { isSignedIn } = useAuth()

  return (
    <Routes>

      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
      <Route path="/login" element={ isSignedIn ? <Navigate to="/chat" /> : <Auth /> } />
      <Route path="/not-human" element={<NotHuman />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/chat" element={ <>
            <SignedIn> <ProtectedDIU> <Chatbot /> </ProtectedDIU> </SignedIn>
            <SignedOut> <Navigate to="/login" /> </SignedOut> </> } />
      <Route path="/" element={ isSignedIn ? <Navigate to="/chat" /> : <Navigate to="/login" /> } />

    </Routes>
    
  )
}
export default App
