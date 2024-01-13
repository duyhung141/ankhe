import React from "react"

function Input(props) {
    const label = props.label
    const placeholder = props.placeholder
    return (
        <>
            <div className="flex flex-col w-fit">
                <label className="font-semibold">{label} <span className="text-red-600">*</span></label>
                <input
                    className="font-semibold px-4 py-2 rounded border-2"
                    placeholder={placeholder}/>
            </div>
        </>
    )
}

export default Input
