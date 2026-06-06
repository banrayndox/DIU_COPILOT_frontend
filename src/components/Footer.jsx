import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {

  const location = useLocation()

  const info = [
    { label: "FAQ", path: "/faq" },
    { label: "Not Human", path: "/not-human" },
    { label: "Feedback", path: "/feedback" }
  ]

  return (
    <>

      <div
        className='fixed top-2 left-1/3 -translate-x-1/2
        bg-white/40 backdrop-blur-xl border border-white/30
        shadow-2xl rounded-full px-4 py-2 z-50'
      >

        <div className='flex items-center gap-6 md:gap-10'>

          {/* Show Home Button when not on home page */}
          {location.pathname !== "/login" && (

            <Link
              to="/"
              className='text-sm font-medium text-gray-600
              hover:text-black hover:scale-105 transition-all duration-300'
            >
              Home
            </Link>

          )}

          {
            info
              .filter((item) => item.path !== location.pathname)
              .map((item) => (

                <Link
                  key={item.path}
                  to={item.path}
                  className='text-sm font-medium text-gray-600
                  hover:text-black hover:scale-105 transition-all duration-300'
                >

                  {item.label}

                </Link>

              ))
          }

        </div>

      </div>

    </>
  )
}

export default Footer