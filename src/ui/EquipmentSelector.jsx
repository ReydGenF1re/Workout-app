import React, { forwardRef } from 'react';
import useEquipment from "../utils/UseEquipment.js";

const EquipmentSelector = forwardRef(({ onChange, isSelect, value, name }, ref) => {
    const equipment = useEquipment();

    if (isSelect) {
        return (
            <select
                ref={ref}
                name={name}
                className="p-2 border-2 rounded-md bg-black border-gray-500"
                onChange={onChange}
                value={value}
            >
                <option value="">Все оборудование</option>
                {equipment.map((eq) => (
                    <option key={eq} value={eq}>
                        {eq}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            {equipment.map((eq) => (
                <label key={eq} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        ref={ref}
                        name={name}
                        value={eq}
                        onChange={onChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-300">{eq}</span>
                </label>
            ))}
        </div>
    );
});

export default EquipmentSelector;
