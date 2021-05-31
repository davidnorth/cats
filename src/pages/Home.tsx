import React, {useState, useEffect} from 'react'
import Cat from '../components/Cat'
import {getCats} from '../lib/cat-api'
import { Link } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";
import './Home.css'

import { useAppDispatch } from '../app/hooks';
import { addFlash } from '../features/flash/flashSlice'

const PER_PAGE = 6

function Home() {  
  const dispatch = useAppDispatch()

  const [page, setPage] = useState(0)
  const [cats, setCats] = useState([])
  const [catCount, setCatCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const moreToLoad = cats.length < catCount

  useEffect(() => {
    setLoading(true)
    getCats(PER_PAGE, page)
      .then((result) => {
        setLoading(false)
        setCatCount(result.catCount)
        setCats(cats.concat(result.cats))
      })
      .catch((e) => {
        setLoading(false)
        dispatch(addFlash({message: 'Failed to load cats. Please try later', className: 'error'}))
      })
  }, [page])

  function loadMore() {
    setPage(page+1)
  }

  return (
    <div>
        <p><Link to="/upload"><button>Upload a cat</button></Link></p>
        {!loading && !cats.length ? <p>No cats have been uploaded yet.</p> : null}
        <div className="grid">
          {cats.map((cat:Cat) => (
            <Cat key={cat.id} cat={cat} />
          ))}
        </div>
        <div className="contentLoading">
          <ClipLoader loading={loading} size={75} />
        </div>
        {!loading && moreToLoad ? <p className="loadMore"><button onClick={loadMore}>Load more</button></p> : null}
    </div>
  );
}

export default Home
