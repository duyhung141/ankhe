import React from "react"
import warning from "../../assets/img/warning.png"

function Result(props) {
    const {data} = props
    return (
        <>
            <div className="mt-5 border-2 rounded shadow px-8 py-6 w-fit mx-auto">
                <p className="font-medium text-lg text-[#BE123C]">Kết quả dự báo</p>
                <div className="mt-2 flex items-center gap-5">
                    <div className="w-20">
                        <img src={warning} alt=""/>
                    </div>

                    <div className="text-start">
                        <p className="font-medium">Thời điểm t + 2: <span
                            className="font-normal">{data.results_t2[0]}</span></p>
                        <p className="font-medium">Thời điểm t + 4: <span
                            className="font-normal">{data.results_t4[0]}</span></p>
                        <p className="font-medium">Thời điểm t + 6: <span
                            className="font-normal">{data.results_t6[0]}</span></p>
                        <p className="font-medium">Thời điểm t + 12: <span
                            className="font-normal">{data.results_t12[0]}</span></p>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Result