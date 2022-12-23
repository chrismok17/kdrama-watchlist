import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import DramaList from './components/DramaList';
import DramaListHeading from './components/DramaListHeading';
import SearchBox from './components/SearchBox';

function App() {
  const [ kdramas, setKdramas ] = useState([])
  const [ searchValue, setSearchValue ] = useState('')
  
  const getkdrama = async (searchValue: string) => {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&page=1&query=${searchValue}&include_adult=false`;
      const response = await fetch(url);
      const resJSON = await response.json();
      console.log(resJSON.results)
      if (resJSON.results) {
          setKdramas(resJSON.results)
    }
  };

  useEffect(() => {
    getkdrama(searchValue);
  }, [searchValue]);
  
  return (
    <div className="container-fluid kdrama-app">
      <h1>Welcome to your Korean Drama watchlist!</h1>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <DramaListHeading heading="Korean Dramas"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <DramaList kdramas={kdramas}/>
      </div>
    </div>
  );
}

export default App;
