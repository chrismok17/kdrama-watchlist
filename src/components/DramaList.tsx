import React from "react";
import AddToFavourite from "./AddToFavourites";

const DramaList = (props: any) => {
    return (
        <>
            {props.kdramas.map((kdrama: any, index: any) => (
                <div className='image-container d-flex justify-content-start m-3'>
                    <img src={`https://image.tmdb.org/t/p/original/${kdrama.poster_path}`} alt="kdrama"></img>
                    <div className='overlay d-flex align-items-center justify-content-center' onClick={() => props.handleFavouritesClick(kdrama)}>
                        <AddToFavourite/>
                    </div>
                </div>
            ))}
        </>
    )
}

export default DramaList;