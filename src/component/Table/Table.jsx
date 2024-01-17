import React from "react";
import classNames from "classnames";

function Table(props) {
    const { headers, datas, colorHeader } = props;

    const headingClass = classNames({
        [`bg-[${colorHeader}]`]: true,
        [`text-[${colorHeader}]`]: true,
    });
    return (
        <>
            <table className="">
                <thead className={headingClass}>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="border border-gray-400 px-4 py-2">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {datas.map((data, index) => (
                    <tr
                        key={index}
                        className="hover:bg-gray-100 hover:cursor-pointer"
                    >
                        {Object.values(data).map((item, index) => (
                            <td
                                key={index}
                                className="border border-gray-400 px-4 py-2"
                            >
                                {item}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;
