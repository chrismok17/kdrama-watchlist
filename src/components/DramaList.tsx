import React from "react";

const DramaList = (props: any) => {
    const FavouriteComponent = props.favouriteComponent
    const data = Array.from(props.kdramas)
    return (
        <>
            {data.map((kdrama: any, index: any) => (
                <div className='image-container d-flex justify-content-start m-3' key={index}>
                    <img src={`https://image.tmdb.org/t/p/original/${kdrama.poster_path}`} alt={kdrama.name}></img>
                    <div className='overlay d-flex align-items-center justify-content-center' onClick={() => props.handleFavouritesClick(kdrama)}>
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    )
}

export default DramaList;