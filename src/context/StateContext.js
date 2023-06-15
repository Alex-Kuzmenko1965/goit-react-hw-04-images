import React, { createContext, useContext, useState } from "react";
// import ErrorMessage from "../components/ErrorMessage";
// import { useSearchParams } from "react-router-dom";

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
  const limit = 12;
  const [totalPages, setTotalPages] = 
  useState(1);
  const [isModalOpen, setIsModalOpen] = 
  useState(false);
  const [largeImageURL, setLargeImageURL] = 
  useState("");

  // useEffect(() => {
  //   if ( setSearchQuery(searchQuery) !== searchQuery || setCurrentPage(currentPage) !== currentPage)
  //   {fetchGallery();}
  // }, [searchQuery, currentPage]);

  // const fetchGallery = async () => {
  //   // const {  searchQuery, limit, currentPage } = this.state;
    
  //   await setStatus(STATUS.PENDING);   

  //   try {
  //     const data = await getImagesGalery({ searchQuery, currentPage, limit });
  //     console.log(data);

  //     if (!data.hits.length) {
  //       throw new Error("No matches found");
  //     }
      
  //     // this.setState((prevState) => ({
  //     //   hits: [...prevState.hits, ...data.hits],
  //       // totalPages: Math.ceil(data.totalHits / limit),
  //       // status: STATUS.RESOLVED,
  //       // error: null,
  //     // }));
  //     setHits(data.hits);
  //     setLimit(12);
  //     setTotalPages(Math.ceil(data.totalHits / limit));
  //     setStatus(STATUS.REJECTED);
  //     setError(null);
  //   } catch (error) {
  //     setError("message");
  //     setStatus(STATUS.REJECTED);
  //   }
  // };

 
  // const handleSearchChange = event => {    
  //   setSearchQuery(event.currentTarget.value);
  //   console.log(searchQuery);
  // };

  // const handleFormSubmit = searchQuery => {
  //   setSearchQuery(searchQuery);
  //   setHits([]);
  //   setCurrentPage(1);
  // };

  // const handleLoadMore = () => {
  //   setCurrentPage(prevCurrentPage => prevCurrentPage + 1 );
  // };

  // const openModal = event => {
  //   setLargeImageURL(event.target.id);
  //   handleModal();
  // }

  // const handleModal = () => {
  //   setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  // };

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
        // handleSearchChange,
        // handleFormSubmit,
        // handleLoadMore,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);