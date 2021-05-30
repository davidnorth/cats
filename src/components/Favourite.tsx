import React, {useState} from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import ClipLoader from "react-spinners/ClipLoader";
import {makeFavourite, removeFavourite} from '../lib/cat-api'

interface CatProps {
  cat: Cat
}

function renderHeart(filled:boolean) {
  return filled ? <AiFillHeart /> : <AiOutlineHeart />
}

function Favourite({cat}:CatProps) {  
  const [favourited, setFavourited] = useState(!!cat.favourite)
  const [favouriteId, setFavouriteId] = useState(cat.favourite && cat.favourite.id ? cat.favourite.id : '')
  const [loading, setLoading] = useState(false)

  function toggleFavourite(e:React.SyntheticEvent) {
    e.preventDefault()
    // TODO: error handling
    setLoading(true)
    if(favourited) {
      removeFavourite(favouriteId)
        .then((r) => {
          setFavourited(false)
          setFavouriteId('')
          setLoading(false)
        })
        .catch((e) => {
          console.log(e)
          setLoading(false)
        })
    } else {
      makeFavourite(cat.id)
        .then((favouriteId:string) => {
          setFavourited(true)
          setFavouriteId(favouriteId)
          setLoading(false)
        })
        .catch((e) => {
          console.log(e)
          setLoading(false)
        })
    }
  }

  return (
    <span className="icon" onClick={toggleFavourite}>
      { loading ? null : renderHeart(favourited) }
      <ClipLoader color='white' loading={loading} size={150} />
    </span>
  );
}

export default Favourite
