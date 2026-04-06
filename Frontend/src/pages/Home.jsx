import React from 'react'
import Hero from '../sections/Hero'
import Footer from '../sections/Footer'
import Skills from '../sections/Skills'
import ProjectList from '../sections/projectList'


const Home = () => {
  return (
    <div>
        <Hero />
        <Skills />
        <ProjectList />
        <Footer />
    </div>
  )
}

export default Home
