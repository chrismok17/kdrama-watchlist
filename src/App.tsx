import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DramaList from './components/DramaList';
import DramaListHeading from './components/DramaListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourite from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [ kdramas, setKdramas ] = useState([])
  const [ searchValue, setSearchValue ] = useState('')
  const [ favourites, setFavourites ] = useState([])
  
  const getkdrama = async (searchValue: string) => {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&page=1&query=${searchValue}&include_adult=false`;
    // const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=ko&query=${searchValue}&page=1&include_adult=false`
      const response = await fetch(url);
      const resJSON = await response.json();
      
      if (resJSON.results) {
        const kdramas = resJSON.results.filter((kdrama: any) => kdrama.origin_country[0] === "KR")
        setKdramas(kdramas)
    }
  }; 

  const addFavouriteDrama = (kdrama: object) => {
    const newFavouriteList: any = [...favourites, kdrama];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const saveToLocalStorage = (items: any) => {
		localStorage.setItem('react-kdrama-app-favourites', JSON.stringify(items));
	};

  const removeFavouriteDrama = (kdrama: any) => {
		const newFavouriteList = favourites.filter(
			(favourite:object) => favourite !== kdrama
		);
		setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
	};

  useEffect(() => {
    getkdrama(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const kdramafavourites = JSON.parse(
      localStorage.getItem('react-kdrama-app-favourites') || '{}'
    );
    setFavourites(kdramafavourites)
  })
  
  return (
    <div className='container-fluid kdrama-app'>
      <h1>Welcome to your Korean Drama watchlist!</h1>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <DramaListHeading heading="Korean Dramas"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <DramaList 
          kdramas={kdramas} 
          favouriteComponent={AddToFavourite} 
          handleFavouritesClick={addFavouriteDrama}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <DramaListHeading heading="Favourites"/>
      </div>
      <div className='row'>
        <DramaList 
          kdramas={favourites} 
          handleFavouritesClick={removeFavouriteDrama} 
          favouriteComponent={RemoveFavourites}/>
      </div>
    </div>
  );
}

export default App;
