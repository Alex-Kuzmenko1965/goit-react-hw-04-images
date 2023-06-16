import React, { createContext, useContext, useState } from "react";
// import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const Context = createContext();

const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export const StateContext = ({ children }) => {
  const [hits, setHits] = 
  useState([]);
  const [searchQuery, setSearchQuery] = 
  useState("");
  const [status, setStatus] = 
  useState(STATUS.IDLE);
  const [error, setError] = 
  useState(null);  
  const [currentPage, setCurrentPage] = 
  useState(1);  
  const [totalPages, setTotalPages] = 
  useState(1);
  const [isModalOpen, setIsModalOpen] = 
  useState(false);
  const [largeImageURL, setLargeImageURL] = 
  useState("");
  const limit = 12;

  return (
    <Context.Provider
      value={{
        hits,
        setHits,
        searchQuery,
        setSearchQuery,
        status,
        setStatus,
        error,
        setError,
        limit,        
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        isModalOpen,
        setIsModalOpen,
        largeImageURL,
        setLargeImageURL,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);