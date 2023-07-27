import React from "react";

interface DetailsProps {
    details: string;
    onClose: () => void;
  }

  
const Details: React.FC<DetailsProps> = ({details, onClose}) => {
    return (
        <>
            <div className='modal'>
                <div className='modal-content' onClick={onClose}>
                    <p className="modal-overview">{details}</p>
                </div>
            </div>
        </>
    )
}

export default Details;