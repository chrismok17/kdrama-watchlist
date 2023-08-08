import React from 'react';
import { CloseButton } from 'react-bootstrap';

const RedCloseButton =  (props: any) => {
    const onClick = props.onClick;
    const closeButtonStyle = {
        backgroundColor: 'red', // Set the background color to red
        color: 'white' // Set the text color to white
    };

    return <CloseButton onClick={onClick} style={closeButtonStyle} />;
};

export default RedCloseButton;
