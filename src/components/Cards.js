import React from 'react'
import '../css/Cards.css'
import CardItem from './CardItem'
import img1 from '../images/1.png'
import img2 from '../images/2.png'
import img3 from '../images/3.png'
import img4 from '../images/4.png'
import img5 from '../images/5.png'

function Cards () {
  return (
    <div className='cards'>
      <h1 className='h1Card'>Remove Pseudo, Preserve Truth</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={img4}
              text='The Market for Fake Reviews'
              label='Video'
              path='https://www.youtube.com/watch?v=wbyfhGHX0Vg'
            />
            <CardItem
              src={img5}
              text='Why Amazon Has So Many Counterfeit Goods'
              label='Video'
              path='https://www.youtube.com/watch?v=wfPM3i9NIHM'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={img1}
              text='The Market for Fake Reviews'
              label='Article'
              path='https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3664992'
            />
            <CardItem
              src={img2}
              text='How Reliable Are Amazon Reviews?'
              label='Article'
              path='https://towardsdatascience.com/how-reliable-are-amazon-reviews-eb8c454c96a4'
            />
            <CardItem
              src={img3}
              text='How to Spot a Fake Review on Amazon'
              label='Article'
              path='https://www.pcmag.com/how-to/spot-a-fake-review-on-amazon'
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
