import React from "react"
import Table from "../../component/Table/Table";

function HomePage() {
    const headers1 =[
        "Tên hồ",
        "Thời điểm",
        "Mực nước thượng lưu (m)",
        "Mực nước dâng bình thường (m)",
        "Mực nước chết (m)",
        "Lưu lượng đến hồ (m3/s)",
        "Lưu lượng xả (m3/s)",
        "Lưu lượng xả qua đập tràn (m3/s)",
        "Lưu lượng xả qua nhà máy (m3/s)",
        "Số cửa xả sâu",
        "Số cửa xả mặt"
    ]
    const datas1 = [
        {
            "Tên hồ":"Kanak",
            "Thời điểm":"2021-09-09 00:00:00",
            "Mực nước thượng lưu (m)":"0.00",
            "Mực nước dâng bình thường (m)": "0.00",
            "Mực nước chết (m)": "0.00",
            "Lưu lượng đến hồ (m3/s)": "0.00",
            "Lưu lượng xả (m3/s)": "0.00",
            "Lưu lượng xả qua đập tràn (m3/s)": "0.00",
            "Lưu lượng xả qua nhà máy (m3/s)": "0.00",
            "Số cửa xả sâu": "0",
            "Số cửa xả mặt": "0"

        },
    ]
    const headers2 =[
        "Thời điểm",
        "Lưu lượng đến hồ An Khê (m3/s)",

    ]
    const datas2 = [
        {
            "Thời điểm":"2021-09-09 00:00:00",
            "Lưu lượng đến hồ An Khê (m3/s)": "0.00",
        },
        {
            "Thời điểm":"2021-09-09 00:00:00",
            "Lưu lượng đến hồ An Khê (m3/s)": "0.00",
        },
        {
            "Thời điểm":"2021-09-09 00:00:00",
            "Lưu lượng đến hồ An Khê (m3/s)": "0.00",
        },
    ]
    return(
        <>
            <div className="container mx-auto p-6">
                <div className="">
                    <h3 className="text-start text-lg text-[#0891B2] font-bold py-1 md:text-3xl md:py-2">Thông tin vận hành hồ chứa An Khê - Kanak</h3>
                    <Table headers={headers1} datas={datas1} colorHeader={"0891B2"}/>
                </div>

                <div className="mt-10">
                    <h3 className="text-start text-lg text-[#0891B2] font-bold py-1 md:text-3xl md:py-2">Dự báo lưu lượng nước đến hồ chứa An Khê </h3>
                    <Table headers={headers2} datas={datas2} colorHeader={"059669"}/>
                </div>

            </div>
        </>
    )
}

export default HomePage
