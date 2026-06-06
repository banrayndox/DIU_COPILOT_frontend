import React from 'react'
import Google_Login from '../components/Google_Login'
import img1 from '../assets/images/DIU2.jpg'
import Footer from '../components/Footer'


const Auth = () => {

  return (
    <div className='min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex flex-col justify-between'>

      {/* CENTER CONTENT */}
      <div className='flex flex-1 items-center justify-center px-5 py-15'>

        <div className='bg-white/30 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[40px] p-6 md:p-10 w-full max-w-5xl'>

          <div className='grid md:grid-cols-2 gap-10 items-center'>

            {/* IMAGE SIDE */}
            <div className='flex justify-center'>

              <img
                src={img1}
                className='rounded-[30px] shadow-xl object-cover w-full max-w-sm max-h-[420px]
                hover:scale-[1.03] transition duration-500'
              />

            </div>

            {/* TEXT SIDE */}
            <div className='flex flex-col justify-center text-center md:text-left'>

              <p className='text-xs tracking-[0.3em] text-gray-600 uppercase mb-2'>
                DIU COPILOT 
              </p>

              <h1 className='text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4'>
                Continue your <br /> agentic journey
              </h1>

              <p className='text-sm text-gray-700 mb-8 leading-relaxed'>
                Login securely to access DIU Copilot and continue exploring
                AI-powered productivity tools.
              </p>

              <div className='w-full md:w-auto'>
                <Google_Login />
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  )
}

export default Auth