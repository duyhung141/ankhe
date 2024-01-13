import React from "react"

function Button(props) {
    const content = props.content
    return (
        <button
            className="bg-[#6EE7B7] font-semibold px-6 py-4 rounded hover:bg-[#10b981] focus:border-2 focus:border-[#10b981]">{content}</button>
    )
}

export default Button