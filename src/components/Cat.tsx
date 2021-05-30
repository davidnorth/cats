import React from 'react'
import Favourite from './Favourite'
import './Cat.css'

interface CatProps {
  cat: Cat
}

function Cat({cat}:CatProps) {  
  return (
    <div className="cat">
      <img src={cat.url} alt="" />
      <Favourite cat={cat} /> 
    </div>
  );
}

export default Cat
