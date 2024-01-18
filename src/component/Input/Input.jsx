import React, { useState } from "react";

function Input(props) {
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const label = props.label;
    const placeholder = props.placeholder;

    return (
        <>
            <div className="flex flex-col">
                <label className="text-start font-semibold">
                    {label} <span className="text-red-600">*</span>
                </label>
                <input
                    className="font-semibold px-4 py-2 rounded border-2"
                />
            </div>
        </>
    );
}

export default Input;
