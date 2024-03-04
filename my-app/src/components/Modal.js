import React from 'react'
import ReactDOM from 'react-dom'

const modal_style= {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgba(34,34,34)',
    transform: 'translate(-50%,-50%)',
    zIndex: 1000,
    height: '90%',
    width: '90%'
}
const overlay_style= {
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000
}

export default function Modal({children, onClose}) {
  return ReactDOM.createPortal(
    <>
    <div style={overlay_style}/>
    <div style={modal_style}>
        <button className='button bg-danger fs-4' style={{marginLeft: "90%" , marginTop:"-35px"}} onClick={onClose}>x</button>
        {children}
    </div>
    
    
    </>,
    document.getElementById('cart-root')
  )
}
