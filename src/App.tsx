import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DramaList from './components/DramaList';
import DramaListHeading from './components/DramaListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourite from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import RedCloseButton from './components/RedCloseButton';

function App() {
  const [ kdramas, setKdramas ] = useState<object[]>(JSON.parse(localStorage.getItem("react-kdrama-app-kdramas") || "[]"))
  const [ searchValue, setSearchValue ] = useState('')
  const [ favourites, setFavourites ] = useState<object[]>([])
  
  const getkdrama = async (searchValue: string) => {
      const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&page=1&query=${searchValue}&include_adult=false`;
    // const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=ko&query=${searchValue}&page=1&include_adult=false`
      // const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
      const actor_search = `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
      const drama_response = await fetch(url);
      const actor_response = await fetch(actor_search)
      const resJSON = await drama_response.json();
      const actor_resJSON = await actor_response.json();
      const actor_data = actor_resJSON.results
      const data = resJSON.results

      let actor_dramas: object[] = []
      let list_kdramas: object[] = []

      if (data) {
        list_kdramas = data.filter((kdrama: any) => kdrama.origin_country.includes( "KR"))
        setKdramas(list_kdramas)
      }
      if (actor_data) {
        actor_data.forEach((element: any) => {
          actor_dramas = (element.known_for.filter((kdrama: any) => kdrama.origin_country.includes("KR")))
          setKdramas(actor_dramas)
        })
      }
  }; 

  const addFavouriteDrama = (kdrama: object) => {
    // console.log(favourites)
    const newFavouriteList: object[] = []
    for (let i = 0; i < favourites.length; i++) {
      
      newFavouriteList.push(favourites[i])
    }
    newFavouriteList.push(kdrama)
    
    // console.log(newFavouriteList)
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
    getkdrama(searchValue).catch((err: any) => {});
  }, [searchValue]);

  useEffect(() => {
    const kdramafavourites = JSON.parse(
      localStorage.getItem('react-kdrama-app-favourites') || '[]'
    );
    setFavourites(kdramafavourites)
  }, [])

  useEffect(() => {
    localStorage.setItem("react-kdrama-app-favourites", JSON.stringify(favourites));
  }, [favourites])
  
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
          favouriteComponent={RedCloseButton}/>
      </div>
    </div>
  );
}

export default App;
