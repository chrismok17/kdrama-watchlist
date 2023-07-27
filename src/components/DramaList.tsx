import React, { useState } from "react";
import Details from "./Details";

const DramaList = (props: any) => {
    const [ selectedDrama, setSelectedDrama ] = useState<any>(null)
    const FavouriteComponent = props.favouriteComponent
    const data = Array.from(props.kdramas)

    const handleImageClick = (kdrama: any) => {
        setSelectedDrama((prevDrama: any) =>
          prevDrama && prevDrama.id === kdrama.id ? null : kdrama
        );
      };
    
      const handleFavClick = (kdrama: any) => {
        props.handleFavouritesClick(kdrama);
      };
    return (
        <>
            {data.map((kdrama: any, index: any) => (
                <div className='image-container d-flex justify-content-start m-3' key={index}>
                    <img src={`https://image.tmdb.org/t/p/original/${kdrama.poster_path}`} alt={kdrama.name} onClick={() => handleImageClick(kdrama)}></img>
                    <div className='overlay d-flex align-items-center justify-content-center' onClick={() => handleFavClick(kdrama)}>
                        <FavouriteComponent />
                    </div>
                    {selectedDrama && selectedDrama.id === kdrama.id && (
                        <Details details={kdrama.overview} onClose={() => setSelectedDrama(null)}/>
                    )}
                </div>
            ))}
        </>
    )
}

export default DramaList;