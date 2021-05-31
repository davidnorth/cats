import React, {useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {createVote} from '../lib/cat-api'
import { addFlash } from '../features/flash/flashSlice'
import { useAppDispatch } from '../app/hooks';

interface CatProps {
  cat: Cat
}

function Votes({cat}:CatProps) {  
  const dispatch = useAppDispatch()
  const [voteCount, setVoteCount] = useState(cat.vote_count)

  function vote(value: number) {
    createVote(cat.id, value)
      .then((v) => {
        dispatch(addFlash({message: 'Thanks for your vote!', className: 'info'}))
        setVoteCount(voteCount + value*2-1) // 1 or 0 into 1 or -1
      })
      .catch((e) => {
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
      {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
      <button onClick={voteUp}>Vote up</button>
      <button onClick={voteDown}>Vote down</button>
    </div>
  );
}

export default Votes
