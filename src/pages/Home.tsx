import React, {useState, useEffect} from 'react'
import Cat from '../components/Cat'
import {getCats} from '../lib/cat-api'
import { Link } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";
import './Home.css'

const PER_PAGE = 6

function Home() {  
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
      .then((e) => {
        // TODO: Handle error
        console.log(e)
      })
  }, [page])

  function loadMore() {
    setPage(page+1)
  }

  return (
    <div>
        <Link to="/upload">Upload a cat</Link>
        {!loading && !cats.length ? <p>No cats have been uploaded yet.</p> : null}
        <div className="grid">
          {cats.map((cat:Cat) => (
            <Cat key={cat.id} cat={cat} />
          ))}
        </div>
        <div className="contentLoading">
          <ClipLoader loading={loading} size='75' />
        </div>
        {!loading && moreToLoad ? <p><button onClick={loadMore}>Load more</button></p> : null}
    </div>
  );
}

export default Home
