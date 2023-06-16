import React, { useEffect } from 'react';

import cl from './Modal.module.css';

export function Modal({largeImageURL, handleModal, isModalOpen }) {

  useEffect(() => {
    window.addEventListener("keydown", closeOnEsc);
    document.body.style.overflow = "hidden";});  

  const closeOnEsc = (e) => {
    if (e.code === "Escape") {
      handleModal();
      window.removeEventListener("keydown", closeOnEsc);
      document.body.style.overflow = "visible";
      // console.log("ESC");
    }};
  
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      handleModal();
      window.removeEventListener("keydown", closeOnEsc);
      document.body.style.overflow = "visible";
      // console.log("Backdrop");
    }
  };

  return (    
    <div className={cl.Overlay} onClick={handleBackdropClick}>
      <div className={cl.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}