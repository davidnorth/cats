import React, {useState}  from 'react'
import {uploadCat} from '../lib/cat-api'
import { useAppDispatch } from '../app/hooks';
import { addFlash } from '../features/flash/flashSlice'
import { useHistory } from "react-router-dom";

function Upload () {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  function handleSubmit (e:React.SyntheticEvent) {
    e.preventDefault()

    setLoading(true)

    const target = e.target as typeof e.target & {
      image: { 
        value: string 
        files: FileList
      }
    }
  
    uploadCat(target.image.files[0])
      .then((r) => {
        dispatch(addFlash({message: 'Upload successful', className: 'info'}))
        history.push('/')
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
        dispatch(addFlash({message: JSON.parse(e.message).message, className: 'error'}))
      })  
  }
  
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
