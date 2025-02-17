import React from 'react';
import {useSearchParams} from "react-router-dom";
import MusclesSelector from "../../ui/MusclesSelector.jsx";

const MuscleGroupSelector = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const onSort = (category, value) => {
        searchParams.set(category, value)
        setSearchParams(searchParams)
    }

    return (
        <div className={'mb-8'}>
            <h3>Выберите группу мышц</h3>
            <MusclesSelector isSelect={true} onChange={(e) => onSort('muscleGroup', e.target.value)}/>
        </div>
    );
};

export default MuscleGroupSelector;
