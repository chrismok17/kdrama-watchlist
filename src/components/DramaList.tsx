import React, { useEffect, useState } from "react";
import Details from "./Details";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CardGroup, Card } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

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
        });
      };

    return (
        <>
            <div className="drama-list-wrapper">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="kdramas" direction="horizontal">
                    {(provided: any) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="d-flex flex-wrap justify-content-center">
                        <CardGroup>
                            <Row xs={1} md={4} lg={6} className="g-4">
                            {kdramas.map((kdrama: any, index: number) => (
                            <Col key={kdrama.id}>
                            <Draggable key={kdrama.id} draggableId={kdrama.id.toString()} index={index}>
                                {(provided: any) => (
                                <div
                                    className="card-group-wrapper"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Card className='kdrama-card m-4' style={{ width: '225px'}}>
                                    <Card.Img
                                        variant="top"
                                        src={`https://image.tmdb.org/t/p/original/${kdrama.poster_path}`}
                                        alt={kdrama.name}
                                        onClick={() => handleImageClick(kdrama)}
                                    />
                                    <Card.Body>
                                        <Card.Title>{kdrama.name}</Card.Title>
                                        <Card.Text>{selectedDrama && selectedDrama.id === kdrama.id && (
                                            <Details details={kdrama.overview} onClose={() => setSelectedDrama(null)} />
                                        )}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div className='overlay d-flex align-items-center justify-content-center' onClick={() => handleFavClick(kdrama)}>
                                        <FavouriteComponent />
                                        </div>
                                    </Card.Footer>
                                    </Card>
                                </div>
                                )}
                            </Draggable>
                            </Col>
                            ))}
                            </Row>
                        </CardGroup>
                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    )
}

export default DramaList;