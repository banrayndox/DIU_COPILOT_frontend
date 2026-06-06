import { useUser, useClerk } from "@clerk/clerk-react"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const ProtectedDIU = ({ children }) => {

  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()

  useEffect(() => {

    if (!isLoaded || !user) return

    const email =
      user?.primaryEmailAddress?.emailAddress

    const isDIU =
      email?.endsWith("@diu.edu.bd")

    if (!isDIU) {

      alert("Only DIU email allowed")

      signOut()

    }

  }, [user, isLoaded])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  // after signout fallback
  if (!user) {
    return <Navigate to="/login" replace />
  }

  const email =
    user?.primaryEmailAddress?.emailAddress

  const isDIU =
    email?.endsWith("@diu.edu.bd")

  if (!isDIU) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedDIU