import React, { useState } from 'react'
import Footer from '../components/Footer'

const Apply = () => {

  // Example logged in user
  const user = {
    fullName: "Rakib Biswash",
    email: "rakib@gmail.com"
  }

  const isLoggedIn = true

  const [formData, setFormData] = useState({
    fullName: isLoggedIn ? user.fullName : "",
    email: isLoggedIn ? user.email : "",
    university: "",
    department: "",
    semester: "",
    github: "",
    portfolio: "",
    techstack: [],
    experience: "",
    motivation: ""
  })

  const techOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "Tailwind CSS",
    "Redux",
    "GraphQL",
    "Socket.IO",
    "Python",
    "C",
    "C++",
    "Java",
    "Flutter",
    "React Native",
    "UI/UX Design",
    "Figma",
    "Machine Learning",
    "AI/LLM",
    "Cyber Security",
    "DevOps",
    "Git & GitHub"
  ]

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleCheckbox = (tech) => {

    if (formData.techstack.includes(tech)) {

      setFormData({
        ...formData,
        techstack: formData.techstack.filter((item) => item !== tech)
      })

    } else {

      setFormData({
        ...formData,
        techstack: [...formData.techstack, tech]
      })
    }
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    console.log(formData)

    alert("Application submitted successfully!")

    setFormData({
      fullName: isLoggedIn ? user.fullName : "",
      email: isLoggedIn ? user.email : "",
      university: "",
      department: "",
      semester: "",
      github: "",
      portfolio: "",
      techstack: [],
      experience: "",
      motivation: ""
    })
  }

  return (
    <>

      <div className='min-h-screen bg-gradient-to-r from-green-200 to-blue-300 py-18 px-4 pb-28'>

        {/* Heading */}
        <div className='text-center mb-10'>

          <h1 className='text-5xl font-extrabold mb-4'>
            Join NOT HUMAN
          </h1>

          <p className='text-gray-700 max-w-2xl mx-auto'>
            Apply as a contributor and become part of a creative
            community of developers, designers, innovators,
            and builders.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='max-w-4xl mx-auto bg-white/70 backdrop-blur-xl
          rounded-[40px] shadow-2xl p-8 md:p-10'
        >

          {/* Personal Info */}
          <div className='mb-10'>

            <h2 className='text-2xl font-bold mb-5'>
              Personal Information
            </h2>

            <div className='grid md:grid-cols-2 gap-5'>

              <input
                type="text"
                name="fullName"
                placeholder='Full Name *'
                required
                value={formData.fullName}
                disabled={isLoggedIn}
                onChange={handleChange}
                className='p-4 rounded-2xl border border-gray-300 bg-white/80 outline-none disabled:bg-gray-200 disabled:cursor-not-allowed'
              />

              <input
                type="email"
                name="email"
                placeholder='Email Address *'
                required
                value={formData.email}
                disabled={isLoggedIn}
                onChange={handleChange}
                className='p-4 rounded-2xl border border-gray-300 bg-white/80 outline-none disabled:bg-gray-200 disabled:cursor-not-allowed'
              />

              <input
                type="text"
                name="university"
                placeholder='University / College'
                value={formData.university}
                onChange={handleChange}
                className='p-4 rounded-2xl border border-gray-300 bg-white/80 outline-none'
              />

              <input
                type="text"
                name="department"
                placeholder='Department'
                value={formData.department}
                onChange={handleChange}
                className='p-4 rounded-2xl border border-gray-300 bg-white/80 outline-none'
              />

              <input
                type="text"
                name="semester"
                placeholder='Semester / Year'
                value={formData.semester}
                onChange={handleChange}
                className='p-4 rounded-2xl border border-gray-300 bg-white/80 outline-none'
              />

            </div>

          </div>

          {/* Links */}
          <div className='mb-10'>

            <h2 className='text-2xl font-bold mb-5'>
              Portfolio & Links
            </h2>

            <div className='grid gap-5'>

              <input
                type="text"
                name="github"
                placeholder='GitHub Profile Link'
                value={formData.github}
                onChange={handleChange}
                className='p-4 rounded-2xl border border-gray-300 bg-white/80 outline-none'
              />

              <input
                type="text"
                name="portfolio"
                placeholder='Portfolio / LinkedIn / Behance'
                value={formData.portfolio}
                onChange={handleChange}
                className='p-4 rounded-2xl border border-gray-300 bg-white/80 outline-none'
              />

            </div>

          </div>

          {/* Tech Stack */}
          <div className='mb-10'>

            <h2 className='text-2xl font-bold mb-5'>
              Tech Stack & Skills
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>

              {
                techOptions.map((tech, index) => (

                  <label
                    key={index}
                    className='flex items-center gap-3 bg-white/70 p-4 rounded-2xl border border-gray-200 cursor-pointer hover:scale-[1.02] transition-all duration-300'
                  >

                    <input
                      type="checkbox"
                      checked={formData.techstack.includes(tech)}
                      onChange={() => handleCheckbox(tech)}
                    />

                    <span className='text-sm font-medium'>
                      {tech}
                    </span>

                  </label>

                ))
              }

            </div>

          </div>

          {/* Experience */}
          <div className='mb-10'>

            <h2 className='text-2xl font-bold mb-5'>
              Experience
            </h2>

            <textarea
              name="experience"
              placeholder='Tell us about your projects, experience, or achievements...'
              value={formData.experience}
              onChange={handleChange}
              className='w-full h-36 p-5 rounded-2xl border border-gray-300 bg-white/80 outline-none resize-none'
            />

          </div>

          {/* Motivation */}
          <div className='mb-10'>

            <h2 className='text-2xl font-bold mb-5'>
              Why Do You Want To Join?
            </h2>

            <textarea
              name="motivation"
              placeholder='Why do you want to join NOT HUMAN?'
              value={formData.motivation}
              onChange={handleChange}
              className='w-full h-40 p-5 rounded-2xl border border-gray-300 bg-white/80 outline-none resize-none'
            />

          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-black text-white py-5 rounded-2xl
            font-semibold text-lg hover:bg-gray-800
            hover:scale-[1.01] transition-all duration-300 cursor-pointer'
          >
            Apply Now
          </button>

        </form>

        <Footer />

      </div>

    </>
  )
}

export default Apply