import React from 'react'
import './Cat.css'

interface CatProps {
  cat: Cat
}

function Cat({cat}:CatProps) {  

  return (
    <div className="cat">
      <img src={cat.url} alt="" />
    </div>
  );
}

export default Cat
