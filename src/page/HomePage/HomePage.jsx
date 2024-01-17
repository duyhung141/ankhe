import React from "react"
import Table from "../../component/Table/Table";
import image1 from "../../assets/img/image 1.png"
import image2 from "../../assets/img/image 2.png"
import Input from "../../component/Input/Input";
import Button from "../../component/Button/Button";

function HomePage() {
    const headers1 = [
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
            "Tên hồ": "Kanak",
            "Thời điểm": "2021-09-09 00:00:00",
            "Mực nước thượng lưu (m)": "0.00",
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
    const headers2 = [
        "Thời điểm",
        "Lưu lượng đến hồ An Khê (m3/s)",

    ]
    const datas2 = [
        {
            "Thời điểm": "2021-09-09 00:00:00",
            "Lưu lượng đến hồ An Khê (m3/s)": "0.00",
        },
        {
            "Thời điểm": "2021-09-09 00:00:00",
            "Lưu lượng đến hồ An Khê (m3/s)": "0.00",
        },
        {
            "Thời điểm": "2021-09-09 00:00:00",
            "Lưu lượng đến hồ An Khê (m3/s)": "0.00",
        },
    ]

    const [importExcel, setImportExcel] = React.useState(false)
    return (
        <>
            <div className="container mx-auto p-6">
                <div className="">
                    <h3 className="text-start text-lg text-[#0891B2] font-medium py-1 md:text-3xl md:py-2">Thông tin vận
                        hành hồ chứa An Khê - Kanak</h3>
                    <Table headers={headers1} datas={datas1} colorHeader={"#0d9488"}/>
                </div>

                <div className="mt-10">
                    <h3 className="text-start text-lg text-[#0891B2] font-medium py-1 md:text-3xl md:py-2">Dự báo lưu
                        lượng nước đến hồ chứa An Khê </h3>
                    <Table headers={headers2} datas={datas2} colorHeader={"#059669"}/>
                </div>

                <div className="">
                    <div className="mt-10 flex gap-5 p-6">
                        <div className="">
                            <img src={image1} alt=""/>
                        </div>
                        <div className="mt-10">
                            <img src={image2} alt=""/>
                        </div>
                    </div>
                    <p className="font-medium italic text-center">Thùy điện An Khê - Kanak</p>
                </div>

                <div className="mt-10">
                    <h3 className="text-[#0E7490] text-lg font-medium md:text-3xl">Dự đoán lưu lượng đến hồ chứa An
                        Khê</h3>
                    <div className="mt-2 text-center border h-screen px-12 py-8">
                        <div className="grid gap-5 md:grid-cols-2 md:gap-8 w-fit mx-auto">
                            <Input label={"Tổng lưu lượng xả Kanak thời điểm t (m3)"}
                                   placeholder={"Lưu lượng xả Kanak"}/>
                            <Input label={"Số liệu mưa giữa Kanak - An Khê tại thời điểm t (m3)"}
                                   placeholder={"Số liệu mưa giữa Kanak - An Khê"}/>
                            <Input label={"Lưu lượng nước đến hồ An Khê tại thời điểm t"}
                                   placeholder={"Lưu lượng nước đến hồ An Khê"}/>
                        </div>

                        <div className="mt-5">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    value={importExcel}
                                    onChange={() => setImportExcel(!importExcel)}
                                />
                                <div
                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Dự đoán bằng file excel (.xlsx, .csv)
              </span>
                            </label>
                        </div>
                        {importExcel && (
                            <>
                                <div className="">
                                    <input
                                        className="mx-auto block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        type="file"
                                        accept=".xlsx || .csv"
                                    />
                                    {/*<button*/}
                                    {/*    className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
                                    {/*>*/}
                                    {/*    IMPORT*/}
                                    {/*</button>*/}
                                </div>

                            </>
                        )}
                        <div className="mt-5">
                            <Button content={"Dự đoán"}/>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomePage
