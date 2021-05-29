import React from 'react'
import {uploadCat} from '../lib/cat-api'

function handleSubmit (e:React.SyntheticEvent) {
  e.preventDefault()

  const target = e.target as typeof e.target & {
    image: { 
      value: string 
      files: FileList
    }
  }

  console.log('handle submit')
  console.log(target.image.files[0])

  uploadCat(target.image.files[0]).then((r) => {console.log(r)})

}

function Upload () {
  return (
    <div>
      <h1>Upload</h1>

      <form onSubmit={ handleSubmit }>
        <input type='file' name='image' />
        <button type='submit'>Upload</button>
      </form>

    </div>
  )
}

export default Upload
