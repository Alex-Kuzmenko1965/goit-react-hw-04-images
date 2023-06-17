import React, { useEffect } from 'react';

import cl from './Modal.module.css';

export function Modal({largeImageURL, handleModal, isModalOpen }) {

  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.code === "Escape") {
        handleModal();
        window.removeEventListener("keydown", closeOnEsc);
        document.body.style.overflow = "visible";
        // console.log("ESC");
      }};
    window.addEventListener("keydown", closeOnEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", closeOnEsc);
      // document.body.style.overflow = "visible";
    };
  }, [handleModal]);
  
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      handleModal();      
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