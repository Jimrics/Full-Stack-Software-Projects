import React from 'react';
import Navbar from "./Navbar";
import bannerbackground from "../Assets/home-banner-background.png"
import BannerImage from "../Assets/home-banner-image.png"
import {FirArrowRight} from "react-icons/fi";
const Home = () => {
  return (
    <div className='home-container'>
      <Navbar/>
      <div className="home-banner-container">
        <div className='home-bannerImage-container'>
            <img src={bannerbackground} alt=""></img>
        </div>
   <div className='home-text-selection'>
    <h1 className='primary-heading'>
        Your Favourite Food Delivered Hot and Fresh
    </h1>
   </div>
      </div>
    </div>
  )
}

export default Home
