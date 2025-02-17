import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Services from './Services'

const Home = () => {
  return (
    <div>
      <Header />
      <Services />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home