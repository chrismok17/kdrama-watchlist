import React, { useEffect, useState } from "react";
import Details from "./Details";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DramaList = (props: any) => {
    const [ selectedDrama, setSelectedDrama ] = useState<any>(null);
    
    const FavouriteComponent = props.favouriteComponent;
    // const data = Array.from(props.kdramas);
    const [ kdramas, setKdramas ] = useState<object[]>([]);

    useEffect(() => {
        setKdramas(props.kdramas);
    }, [props.kdramas])

    const handleImageClick = (kdrama: any) => {
        setSelectedDrama((prevDrama: any) =>
          prevDrama && prevDrama.id === kdrama.id ? null : kdrama
        );
    };
    
    const handleFavClick = (kdrama: any) => {
    props.handleFavouritesClick(kdrama);
    };

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        setKdramas((prevKdramas) => {
            const items = Array.from(prevKdramas);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            localStorage.setItem("react-kdrama-app-favourites", JSON.stringify(items));
            return items;
        })
    }

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="kdramas">
                    {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {kdramas.map((kdrama: any, index: number) => (
                        <Draggable key={kdrama.id} draggableId={kdrama.id.toString()} index={index}>
                            {(provided: any) => (
                            <div
                                className='image-container d-flex justify-content-start m-3'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                {/* Your existing code for each drama */}
                                <img src={`https://image.tmdb.org/t/p/original/${kdrama.poster_path}`} alt={kdrama.name} onClick={() => handleImageClick(kdrama)}></img>
                                    <div className='overlay d-flex align-items-center justify-content-center' onClick={() => handleFavClick(kdrama)}>
                                        <FavouriteComponent />
                                    </div>
                                    {selectedDrama && selectedDrama.id === kdrama.id && (
                                        <Details details={kdrama.overview} onClose={() => setSelectedDrama(null)}/>
                                    )}
                            </div>
                            )}
                        </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
            </DragDropContext>
            {/* {data.map((kdrama: any, index: any) => (
                <div className='image-container d-flex justify-content-start m-3' key={index}>
                    <img src={`https://image.tmdb.org/t/p/original/${kdrama.poster_path}`} alt={kdrama.name} onClick={() => handleImageClick(kdrama)}></img>
                    <div className='overlay d-flex align-items-center justify-content-center' onClick={() => handleFavClick(kdrama)}>
                        <FavouriteComponent />
                    </div>
                    {selectedDrama && selectedDrama.id === kdrama.id && (
                        <Details details={kdrama.overview} onClose={() => setSelectedDrama(null)}/>
                    )}
                </div>
            ))} */}
        </>
    )
}

export default DramaList;