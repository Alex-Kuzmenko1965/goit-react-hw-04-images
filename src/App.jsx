// import  cl from './App.module.css';
import { useEffect } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { getImagesGalery } from "./api";
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from "./components/Button/Button";
import { Modal } from "./components/Modal/Modal";
import { useStateContext } from "./context/StateContext";

const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function App() {
  const { hits, setHits } = useStateContext();
  const { searchQuery, setSearchQuery } = useStateContext();
  const { currentPage, setCurrentPage } = useStateContext();
  const { status, setStatus } = useStateContext();
  const { error, setError } = useStateContext();
  const { totalPages, setTotalPages } = useStateContext();
  const { isModalOpen, setIsModalOpen } = useStateContext();
  const { largeImageURL, setLargeImageURL } = useStateContext();
  const { limit } = useStateContext();
  
  useEffect(() => {
    if (!searchQuery) return;
    const fetchGallery = async () => {    
      await setStatus(STATUS.PENDING);   
  
      try {
        const data = await getImagesGalery({ searchQuery, currentPage, limit });
        // console.log(data);
  
        if (!data.hits.length) {
          throw new Error("No matches found");
        }
        
        setHits((prevHits) => [...prevHits, ...data.hits]);      
        setTotalPages(Math.ceil(data.totalHits / limit));
        setStatus(STATUS.RESOLVED);
        setError(null);
      } catch (error) {
        setError(error.message);
        setStatus(STATUS.REJECTED);
      }
    };    
    fetchGallery();
  }, [searchQuery, currentPage, limit, setError, setHits, setStatus, setTotalPages]);

  const handleFormSubmit = searchQuery => {
    setHits([]);
    setCurrentPage(1);
    setSearchQuery(searchQuery);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1 );
  };

  const openModal = event => {
    setLargeImageURL(event.target.id);
    handleModal();
  }

  const handleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };
    
  return (
    <>
      <Searchbar
      searchQuery = {searchQuery}
      // onChange = {handleSearchChange}
      onSubmit = {handleFormSubmit} />
      <ImageGallery 
        currentPage = {currentPage}
        totalPages = {totalPages}
        error = {error}
        status = {status}
        STATUS = {STATUS}
        hits = {hits}
        openModal={openModal} />
      {(hits.length !== 0 && currentPage < totalPages) && (
      <Button
        onClick={handleLoadMore}
        disabled={status === STATUS.PENDING ? true : false}
      >
        {status === STATUS.PENDING ? "Loading..." : "Load More"}
      </Button>
      )}
      {isModalOpen && (
        <Modal
        isModalOpen = {isModalOpen}
        largeImageURL={largeImageURL}
        // openModal={openModal}
        handleModal={handleModal}
        />
      )}
    </>
  );
}