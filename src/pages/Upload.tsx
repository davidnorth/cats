import React, {useState, useMemo}  from 'react'
import {uploadCat} from '../lib/cat-api'
import ClipLoader from "react-spinners/ClipLoader";
import { useAppDispatch } from '../app/hooks';
import { addFlash } from '../features/flash/flashSlice'
import { useHistory } from "react-router-dom";
import {useDropzone} from 'react-dropzone';


// TODO: Extract a Dropzone component including these styles
const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


function Upload () {

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({maxFiles: 1, accept: 'image/*'});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  function upload (e:React.SyntheticEvent) {
    setLoading(true)

    uploadCat(acceptedFiles[0])
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

      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drop an image here, or click to select</p>
      </div>

      <p>{ acceptedFiles.map((f) => 'Selected file: ' + f.name) }</p>

      <p><button onClick={upload} disabled={!acceptedFiles.length || loading}>Upload</button></p>
      <p><ClipLoader loading={loading} /></p>
    </div>
  )
}

export default Upload
