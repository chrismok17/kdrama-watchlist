import React, {useState, useEffect} from "react";
import { FormControl } from 'react-bootstrap';

const SearchBox = (props: any) => {
    const [randomPlaceholder, setRandomPlaceholder] = useState<string>('');

    const placeholderOptions = [
        'Squid Game...',
        'Love...',
        'Heart...',
        'Search...',
        'Flower...'
      ];

    useEffect(() => {
        // Choose a random placeholder from the array
        const randomIndex = Math.floor(Math.random() * placeholderOptions.length);
        setRandomPlaceholder(placeholderOptions[randomIndex]);
      }, []);

    return (
        <div className='col col-sm-4'>
            <FormControl
                className='form-control'
                value={props.value}
                onChange={(e) => props.setSearchValue(e.target.value)}
                placeholder={randomPlaceholder}
            />
        </div>
    );
};

export default SearchBox