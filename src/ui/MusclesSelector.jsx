import React, { forwardRef } from 'react';
import useMuscleGroups from "../utils/useMuscleGroups.js";

const MusclesSelector = forwardRef(({ onChange, isSelect, value, name }, ref) => {
    const muscleGroups = useMuscleGroups();

    if (isSelect) {
        return (
            <select
                ref={ref}
                name={name}
                className="p-2 border-2 rounded-md bg-black border-gray-500 text-white"
                onChange={onChange}
                value={value}
            >
                <option value="">Все группы мышц</option>
                {muscleGroups.map((group) => (
                    <option key={group} value={group}>
                        {group}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <div className="flex flex-wrap flex-col md:flex-row gap-2">
            {muscleGroups.map((group) => (
                <label key={group} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        ref={ref}
                        name={name}
                        value={group}
                        onChange={onChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-300">{group}</span>
                </label>
            ))}
        </div>
    );
});

export default MusclesSelector;
