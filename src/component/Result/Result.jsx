import React from "react"
import warning from "../../assets/img/warning.png"
import checked from "../../assets/img/checked.png"

function Result(props) {
    const {data} = props
    const checkWarning = () => {
        if (data.results_t2[0] > 191 || data.results_t4[0] > 191 || data.results_t6[0] > 191 || data.results_t12[0] > 191) {
            return "Lũ nhỏ";
        } else if (data.results_t2[0] > 622 || data.results_t4[0] > 622 || data.results_t6[0] > 622 || data.results_t12[0] > 622) {
            return "Lũ trung bình";
        } else if (data.results_t2[0] > 1558 || data.results_t4[0] > 1558 || data.results_t6[0] > 1558 || data.results_t12[0] > 1558) {
            return "Lũ lớn";
        } else if (data.results_t2[0] > 2534 || data.results_t4[0] > 2534 || data.results_t6[0] > 2534 || data.results_t12[0] > 2534) {
            return "Lũ rất lớn";
        } else {
            return "Lũ rất nhỏ";
        }
    }
    return (
        <>
            <div className="mt-5 border-2 rounded shadow px-8 py-6 w-fit mx-auto">
                <p className="font-medium text-lg text-[#BE123C]">Kết quả dự báo</p>
                <div className="mt-2 flex items-center gap-5">
                    <div className="w-20">
                        {(data.results_t2[0] > 191 || data.results_t4[0] > 191 || data.results_t6[0] > 191 || data.results_t12[0] > 191) ?
                            <img src={warning} alt=""/> : <img src={checked} alt=""/>
                        }
                        <p className="italic font-medium text-red-400">{checkWarning()}</p>
                    </div>

                    <div className="text-start">
                        <p className="font-medium">Thời điểm t + 1: <span
                            className="font-normal">{data.results_t2[0]}</span></p>
                        <p className="font-medium">Thời điểm t + 2: <span
                            className="font-normal">{data.results_t4[0]}</span></p>
                        <p className="font-medium">Thời điểm t + 3: <span
                            className="font-normal">{data.results_t6[0]}</span></p>
                        <p className="font-medium">Thời điểm t + 4: <span
                            className="font-normal">{data.results_t12[0]}</span></p>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Result