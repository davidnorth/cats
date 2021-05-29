import React, {useState, useEffect} from 'react'
import Cat from '../components/Cat'
import {getCats} from '../lib/cat-api'
import { Link } from "react-router-dom"
import './Home.css'

function Home() {  
  
  const [cats, setCats] = useState([])

  useEffect(() => {
    getCats().then((res) => {
      setCats(res.body)
    })
  }, [])

  console.log(cats)
  
  return (
    <div>
        <Link to="/upload">Upload a cat</Link>
        <div className="grid">
          {cats.map((cat:Cat) => (
            <Cat key={cat.id} cat={cat} />
          ))}
        </div>
    </div>
  );
}

export default Home
