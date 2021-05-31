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
      <div className="tools">
        <Favourite cat={cat} /> 
        <Votes cat={cat} />
      </div>
    </div>
  );
}

export default Cat
