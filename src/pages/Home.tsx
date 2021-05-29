import React, {useState, useEffect} from 'react'
import Cat from '../components/Cat'
import {getCats} from '../lib/cat-api'


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
        Home
        {cats.map((cat:Cat) => (
          <Cat key={cat.id} cat={cat} />
        ))}
    </div>
  );
}

export default Home
