import React from 'react'
import Favourite from './Favourite'
import Votes from './Votes'
import './Cat.css'

interface CatProps {
  cat: Cat
}

function Cat({cat}:CatProps) {  
  return (
    <div className="cat">
      <img src={cat.url} alt="" />
      <Favourite cat={cat} /> 
      <Votes cat={cat} />
    </div>
  );
}

export default Cat
