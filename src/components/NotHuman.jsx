import React from 'react'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const NotHuman = () => {

  const navigate = useNavigate()
  const handleJoin = () => {
    navigate('/apply')
  }
  return (
    <>
      <div className='bg-gradient-to-r from-green-200 to-blue-300 w-full min-h-screen p-4 pt-15'>

        {/* Hero Section */}
        <div className='bg-sky-200 rounded-4xl p-8 shadow-lg hover:scale-[1.01] transition-all duration-300'>

          <div className='flex flex-col justify-center items-center text-center'>

            <h1 className='text-4xl font-extrabold mb-4'>
              Want to join NOT HUMAN?
            </h1>

            <p className='text-lg font-medium text-gray-700 max-w-2xl'>
              Let’s build something insane together.
              A creative tech squad where developers, designers,
              and innovators collaborate on futuristic digital products.
            </p>

            <button onClick={handleJoin} className='mt-6 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-300 cursor-pointer'>
              Join The Team
            </button>

          </div>
        </div>

        {/* Why Join Section */}
        <div className='mt-10 grid md:grid-cols-3 gap-6'>

          <div className='bg-white rounded-3xl p-6 shadow-md'>
            <h2 className='text-xl font-bold mb-3'>
              Real Projects
            </h2>

            <p className='text-gray-600 text-sm'>
              Work on modern full-stack applications, AI tools,
              dashboards, and creative experimental products.
            </p>
          </div>

          <div className='bg-white rounded-3xl p-6 shadow-md'>
            <h2 className='text-xl font-bold mb-3'>
              Learn & Grow
            </h2>

            <p className='text-gray-600 text-sm'>
              Improve your React, MERN, UI/UX, teamwork,
              GitHub collaboration, and problem-solving skills.
            </p>
          </div>

          <div className='bg-white rounded-3xl p-6 shadow-md'>
            <h2 className='text-xl font-bold mb-3'>
              Creative Community
            </h2>

            <p className='text-gray-600 text-sm'>
              Connect with passionate students, developers,
              designers, and creators from different backgrounds.
            </p>
          </div>

        </div>

        {/* Requirements Section */}
        <div className='mt-10 bg-white rounded-4xl p-8 shadow-lg'>

          <h2 className='text-3xl font-bold mb-5 text-center'>
            What We Look For
          </h2>

          <div className='space-y-4 text-gray-700'>

            <p>✔ Passion for technology and creativity</p>
            <p>✔ Basic understanding of coding or design</p>
            <p>✔ Team collaboration mindset</p>
            <p>✔ Consistency and willingness to learn</p>
            <p>✔ Crazy ideas and experimental thinking</p>

          </div>

        </div>

        {/* Bottom CTA */}
        <div className='mt-10 bg-black text-white rounded-4xl p-10 text-center'>

          <h2 className='text-3xl font-bold mb-4'>
            Become a Contributor
          </h2>

          <p className='text-gray-300 max-w-2xl mx-auto'>
            NOT HUMAN is more than a team.
            It’s a movement of builders, creators,
            and future innovators.
          </p>

          <button onClick={handleJoin} className='mt-6 bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 cursor-pointer'>
            Apply Now
          </button>

        </div>

        <Footer />

      </div>
    </>
  )
}

export default NotHuman