import React, { useState } from 'react'

const FAQ = () => {

  const [currentIndex, setCurrentIndex] = useState(null)

  const faqData = [
    {
      q: "What is NOT HUMAN?",
      a: "NOT HUMAN is a creative CS and design team building modern web applications and innovative digital experiences."
    },
    {
      q: "How can I join the team?",
      a: "You can apply through our contributor page by filling out the application form and showcasing your skills."
    },
    {
      q: "Is it free to join?",
      a: "Yes, joining is completely free for students, developers, designers, and creative contributors."
    },
    {
      q: "What technologies do you use?",
      a: "We mainly use the MERN stack, React, Node.js, Express.js, MongoDB, Tailwind CSS, and modern AI tools."
    },
    {
      q: "Who can become a contributor?",
      a: "Anyone passionate about coding, UI/UX design, content creation, or teamwork can become a contributor."
    },
    {
      q: "Do I need professional experience?",
      a: "No, beginners are welcome. We value creativity, consistency, and willingness to learn."
    }
  ]

  const handleCurrentIndex = (index) => {
    setCurrentIndex(currentIndex === index ? null : index)
  }

  return (
    <div className='min-h-screen px-4 py-10'>

      {/* Heading */}
      <div className='text-center mb-10'>

        <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
          Frequently Asked Questions
        </h1>

        <p className='text-gray-500 text-sm mt-2'>
          Everything you need to know about DIU COPILOT
        </p>

      </div>

      {/* FAQ Box */}
      <div className='max-w-3xl mx-auto space-y-4'>

        {
          faqData.map((item, index) => (

            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden
              ${
                currentIndex === index
                  ? "bg-white shadow-xl border-gray-300"
                  : "bg-white/50 border-gray-200 hover:bg-white/70"
              }`}
            >

              {/* Question */}
              <div
                onClick={() => handleCurrentIndex(index)}
                className='flex justify-between items-center px-5 py-4 cursor-pointer'
              >

                <h2 className='text-sm md:text-base font-medium text-gray-800'>
                  {item.q}
                </h2>

                <span
                  className={`text-xl transition-transform duration-300
                  ${currentIndex === index ? "rotate-180 text-black" : "text-gray-400"}`}
                >
                  {currentIndex === index ? "−" : "+"}
                </span>

              </div>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden
                ${currentIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >

                <p className='px-5 pb-4 text-sm text-gray-600 leading-relaxed'>
                  {item.a}
                </p>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default FAQ