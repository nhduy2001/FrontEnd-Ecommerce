import React from 'react'
import './ExploreBrands.css'
import {brand_list} from '../assets/assets'

export const ExploreBrands = () => {
  return (
    <div className='explore-brand'>
        <h1>Explore our brands</h1>
        <div className="explore-brand-list">
            {brand_list.map((item,index) => {
                return (
                    <div key={index} className="explore-brand-list-item">
                        <img src={item.brand_image} alt="" height="50px"/>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}
