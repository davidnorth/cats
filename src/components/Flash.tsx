import React from 'react'
import './Flash.css'
import { useAppSelector } from '../app/hooks';

function Flash() {  
  const flash = useAppSelector((state) => state.flash)

  if(!flash.message.length) {
    return <span></span>
  }

  return (
    <div className={'flash ' + flash.className}>{flash.message}</div>
  );
}

export default Flash
