import React from 'react'
import '../css/VideoTitle.css'
import { IoMdArrowRoundDown } from 'react-icons/io'
import video1 from '../videos/video-2.mp4'

function VideoTitle () {
  return (
    <div className='hero-container'>
      <video src={video1} autoPlay loop muted />
      <h1 className='hero-h1'>USEFUL INFORMATION</h1>
      <p>What are you waiting for?</p>
      <br></br>
      <br></br>
      <br></br>
      <p><IoMdArrowRoundDown></IoMdArrowRoundDown>Scroll down to discover more!<IoMdArrowRoundDown></IoMdArrowRoundDown></p>
    </div>
  )
}

export default VideoTitle