import React from 'react'
import VideoTitle from '../components/VideoTitle'
import Infographic from '../components/Infographic'
import Cards from '../components/Cards'

function Information () {
  return (
    <div style={{ paddingTop: '60px' }}>
      <VideoTitle></VideoTitle>

      <Cards></Cards>
      <Infographic></Infographic>
    </div>
  )
}

export default Information