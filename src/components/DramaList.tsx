import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

function DramaList(props: any) {
  const [selectedDrama, setSelectedDrama] = useState<any>(null);
  const FavouriteComponent = props.favouriteComponent;
  const [kdramas, setKdramas] = useState<object[]>([]);

  useEffect(() => {
    setKdramas(props.kdramas);
  }, [props.kdramas]);

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
    <Container fluid className="drama-list-wrapper">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="kdramas" direction="vertical">
          {(provided: any) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="d-flex flex-wrap justify-content-center items"
            >
              {kdramas.map((kdrama: any, index: number) => (
                <Draggable
                  key={kdrama.id}
                  draggableId={kdrama.id.toString()}
                  index={index}
                >
                  {(provided: any) => (
                    <div
                      className="card-group-wrapper"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                        <Card className="kdrama-card m-2 d-flex justify-content-center">
                            <Row className="row-height">
                                <Col md={2}>
                                    <div className="rank-number">
                                      {index + 1}
                                    </div>
                                    <Image
                                        src={`https://image.tmdb.org/t/p/original/${kdrama.poster_path}`}
                                        alt={kdrama.name}
                                        onClick={() => handleImageClick(kdrama)}
                                        className="image-size" 
                                        fluid
                                    />
                                </Col>
                                <Col md={10}>
                                    <div className="d-flex justify-content-end pr-3 pt-3" onClick={() => handleFavClick(kdrama)}>
                                        <FavouriteComponent/>
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{kdrama.name}</Card.Title>
                                        <Card.Text>
                                        {kdrama.overview}
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default DramaList;
