import React from 'react'

interface CatProps {
  cat: Cat
}

function Cat({cat}:CatProps) {  
  return (
    <div>
        <img src={cat.url} />
    </div>
  );
}

export default Cat
