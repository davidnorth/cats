import React, {useState} from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import ClipLoader from "react-spinners/ClipLoader";
import {makeFavourite, removeFavourite} from '../lib/cat-api'
import { addFlash } from '../features/flash/flashSlice'
import { useAppDispatch } from '../app/hooks';

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
  const dispatch = useAppDispatch()

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
          dispatch(addFlash({message: 'Failed to remove favourite', className: 'error'}))
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
          dispatch(addFlash({message: 'Failed to add favourite', className: 'error'}))
          setLoading(false)
        })
    }
  }

  return (
    <span className="favourite icon" onClick={toggleFavourite}>
      <ClipLoader loading={loading} size={18} />
      { loading ? null : renderHeart(favourited) }
    </span>
  );
}

export default Favourite
