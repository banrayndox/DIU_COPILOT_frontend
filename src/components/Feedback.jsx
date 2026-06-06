import React, { useState } from 'react'
import Footer from './Footer'

const Feedback = () => {

  // Example logged in user
  const user = {
    name: "Rakib Biswash",
    email: "rakib@gmail.com"
  }

  const isLoggedIn = true

  const [name, setName] = useState(isLoggedIn ? user.name : "")
  const [email, setEmail] = useState(isLoggedIn ? user.email : "")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({
      name,
      email,
      message
    })

    alert("Feedback submitted successfully!")

    setMessage("")
  }

  return (
    <>
      <div className='min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex justify-center items-center p-5'>

        <form
          onSubmit={handleSubmit}
          className='bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-6 w-full max-w-xl'
        >

          {/* Heading */}
          <h1 className='text-2xl font-bold text-center mb-2'>
            Feedback
          </h1>

          <p className='text-center text-gray-600 text-sm mb-6'>
            Share your thoughts with DIU COPILOT
          </p>

          {/* Inputs */}
          <div className='space-y-4'>

            <input
              type="text"
              placeholder='Your Name'
              value={name}
              disabled={isLoggedIn}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-3 text-sm rounded-xl border border-gray-300 bg-white/70 outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-200 disabled:cursor-not-allowed'
            />

            <input
              type="email"
              placeholder='Your Email'
              value={email}
              disabled={isLoggedIn}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-3 text-sm rounded-xl border border-gray-300 bg-white/70 outline-none focus:ring-2 focus:ring-green-300 disabled:bg-gray-200 disabled:cursor-not-allowed'
            />

            <textarea
              placeholder='Write your feedback...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full h-32 p-3 text-sm rounded-xl border border-gray-300 bg-white/70 outline-none focus:ring-2 focus:ring-sky-300 resize-none'
            />

            <button
              type='submit'
              className='w-full bg-black text-white py-3 text-sm rounded-xl font-medium hover:scale-[1.02] hover:bg-gray-800 transition-all duration-300'
            >
              Submit Feedback
            </button>

          </div>

        </form>

      </div>

      <Footer />
    </>
  )
}

export default Feedback