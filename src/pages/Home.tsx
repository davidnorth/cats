import React, {useState, useEffect} from 'react'
import Cat from '../components/Cat'
import {getCats} from '../lib/cat-api'
import { Link } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";
import './Home.css'

function Home() {  
  
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCats()
      .then((cats) => {
        setLoading(false)
        setCats(cats)
      })
      .then((e) => {
        // TODO: Handle error
        console.log(e)
      })
  }, [])

  return (
    <div>
        <Link to="/upload">Upload a cat</Link>
        <div className="contentLoading">
          <ClipLoader loading={loading} size='75' />
        </div>
        {!loading && !cats.length ? <p>No cats have been uploaded yet.</p> : null}
        <div className="grid">
          {cats.map((cat:Cat) => (
            <Cat key={cat.id} cat={cat} />
          ))}
        </div>
    </div>
  );
}

export default Home
