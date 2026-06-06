import React from 'react'
import { FcGoogle } from "react-icons/fc"
import Footer from './Footer'

import { useSignIn } from '@clerk/clerk-react'

const Google_Login = () => {
  const { signIn } = useSignIn()
  const login = async () => {
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/chat"
    })
  }

  return (

    <div className='flex justify-center'>

      <button
        onClick={login}
        className="
          flex items-center gap-3
          px-6 py-3
          bg-white/60 backdrop-blur-lg
          border border-gray-300
          rounded-2xl
          shadow-md
          font-medium
          text-gray-800
          hover:bg-gradient-to-r hover:from-green-200 hover:to-sky-300
          hover:text-gray-900
          hover:shadow-xl
          hover:scale-105
          active:scale-95
          transition-all duration-300
          cursor-pointer
        "
      >

        <span className="text-xl">
          <FcGoogle />
        </span>

        <span className="text-sm md:text-base">
          Sign in with <b>Google</b>
        </span>

      </button>

    </div>
  )
}

export default Google_Login