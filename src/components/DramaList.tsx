import React from "react";

const DramaList = (props: any) => {
    return (
        <>
            {props.kdramas.map((kdrama: any, index: any) => (
                <div className='image-container d-flex justify-content-start m-3'>
                    <img src={`https://image.tmdb.org/t/p/original/${kdrama.poster_path}`} alt="kdrama"></img>
                    <div className='overlay d-flex align-items-center justify-content-center'>
                        Add to Favourites
                    </div>
                </div>
            ))}
        </>
    )
}

export default DramaList;