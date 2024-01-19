import React from "react";
import classNames from "classnames";

function Table(props) {
    const {headers, datas, colorHeader} = props;
    const lengthData = datas['result_x1'].length;
    console.log(datas['result_x1'][1])
    // console.log(datas)
    const headingClass = classNames({
        [`bg-[${colorHeader}]`]: true,
        [`text-[${colorHeader}]`]: true,
    });

    const Body = () => {
        const rows = [];

        for (let i = 0; i < lengthData; i++) {
            rows.push (
                <>
                    <tr
                        className="hover:bg-gray-100 hover:cursor-pointer"
                    >
                        <td
                            className="border border-gray-400 px-4 py-2"
                        >
                            {datas.result_x1[i]}
                        </td>
                        <td
                            className="border border-gray-400 px-4 py-2"
                        >
                            {datas.result_x2[i]}
                        </td>
                        <td
                            className="border border-gray-400 px-4 py-2"
                        >
                            {datas.result_x3[i]}
                        </td>
                        <td
                            className="border border-gray-400 px-4 py-2"
                        >
                            {datas.results_t2[i]}
                        </td>
                        <td
                            className="border border-gray-400 px-4 py-2"
                        >
                            {datas.results_t4[i]}
                        </td>
                        <td
                            className="border border-gray-400 px-4 py-2"
                        >
                            {datas.results_t6[i]}
                        </td>
                        <td
                            className="border border-gray-400 px-4 py-2"
                        >
                            {datas.results_t12[i]}
                        </td>
                    </tr>
                </>
            )
        }
        return <>{rows}</>
    }
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
                <Body/>
                {/*{datas.map((data, index) => (*/}
                {/*    <tr*/}
                {/*        key={index}*/}
                {/*        className="hover:bg-gray-100 hover:cursor-pointer"*/}
                {/*    >*/}
                {/*        {Object.values(data).map((item, index) => (*/}
                {/*            <td*/}
                {/*                key={index}*/}
                {/*                className="border border-gray-400 px-4 py-2"*/}
                {/*            >*/}
                {/*                {item}*/}
                {/*            </td>*/}
                {/*        ))}*/}
                {/*    </tr>*/}
                {/*))}*/}
                </tbody>
            </table>
        </>
    );
}

export default Table;
