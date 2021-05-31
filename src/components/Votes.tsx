import React, {useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi'
import {createVote} from '../lib/cat-api'
import { addFlash } from '../features/flash/flashSlice'
import { useAppDispatch } from '../app/hooks'
import './Votes.css'

interface CatProps {
  cat: Cat
}

function Votes({cat}:CatProps) {  
  const dispatch = useAppDispatch()
  const [voteCount, setVoteCount] = useState(cat.vote_count)
  const [loading, setLoading] = useState(false)

  function vote(value: number) {
    setLoading(true)
    createVote(cat.id, value)
      .then((v) => {
        setLoading(false)
        setVoteCount(voteCount + value*2-1) // 1 or 0 into 1 or -1
      })
      .catch((e) => {
        setLoading(false)
        dispatch(addFlash({message: 'Failed to save your vote. Please try later', className: 'error'}))
      })
  }

  function voteUp() {
    vote(1)
  }

  function voteDown() {
    vote(0)
  }

  return (
    <div className='votes'>
      <FiThumbsUp onClick={voteUp} />
      <FiThumbsDown onClick={voteDown} />
      <span className='voteCount'>{voteCount} {voteCount === 1 ? 'vote' : 'votes'}</span>
      <ClipLoader loading={loading} size={12} />
    </div>
  );
}

export default Votes
