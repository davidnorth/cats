import React, {useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {createVote} from '../lib/cat-api'

interface CatProps {
  cat: Cat
}

function Votes({cat}:CatProps) {  
  function vote(value: number) {
    createVote(cat.id, value)
      .then((v) => {
        console.log('need to update vote count')
        console.log(v)
      })
      .catch((e) => {
        console.log(e)
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
      {cat.vote_count} {cat.vote_count === 1 ? 'vote' : 'votes'}
      <button onClick={voteUp}>Vote up</button>
      <button onClick={voteDown}>Vote down</button>
    </div>
  );
}

export default Votes
