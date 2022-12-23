import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import DramaList from './components/DramaList';

function App() {
  const [ kdramas, setKdramas ] = useState([])
  
  const getkdrama = async () => {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&page=1&query=flower%20of%20evil&include_adult=false`;
    const response = await fetch(url);
    const resJSON = await response.json();

    if (resJSON.Search) {
      setKdramas(resJSON.Search)
    }
  };

  useEffect(() => {
    getkdrama();
  }, []);
  
  return (
    <div className="container-fluid kdrama-app">
      Welcome to your Korean Drama watchlist!
      <div className='row'>
        <DramaList kdramas={kdramas}/>
      </div>
    </div>
  );
}

export default App;
