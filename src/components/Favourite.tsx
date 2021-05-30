import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import {makeFavourite} from '../lib/cat-api'

interface CatProps {
  cat: Cat
}

function Cat({cat}:CatProps) {  

  function toggleFavourite(e:React.SyntheticEvent) {
    e.preventDefault()
    makeFavourite(cat.id)
      .then((r) => console.log(r))
      .catch((e) => console.log(e))
  }

  return (
    <span className="icon" onClick={toggleFavourite}>
      {cat.favourite ? <AiFillHeart /> : <AiOutlineHeart />}
    </span>
  );
}

export default Cat
