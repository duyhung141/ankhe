import React from "react"
import Table from "../../component/Table/Table";
import image1 from "../../assets/img/image 1.png"
import image2 from "../../assets/img/image 2.png"
import Input from "../../component/Input/Input";
import Result from "../../component/Result/Result";
import * as PredictService from "../../service/PredictService";

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
    const [luuLuongXaKanak, setLuuLuongXaKanak] = React.useState("");
    const [soLieuMuaGiuaKanakAnKhe, setSoLieuMuaGiuaKanakAnKhe] = React.useState("");
    const [luuLuongNuocDenHoAnKhe, setLuuLuongNuocDenHoAnKhe] = React.useState("");

    const [importExcel, setImportExcel] = React.useState(null)
    const [file, setFile] = React.useState(null);
    const [result, setResult] = React.useState(null)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        let data = {}
        if (importExcel && file) {
            // handle import excel
            data = await PredictService.predict_xlsx(file);
        } else {
            // handle input
            data = await PredictService.predict(luuLuongXaKanak, soLieuMuaGiuaKanakAnKhe, luuLuongNuocDenHoAnKhe)
        }
        setResult(data)
    }
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
                            <div className="flex flex-col">
                                <label className="text-start font-semibold">
                                    Tổng lưu lượng xả Kanak thời điểm t (m3) <span className="text-red-600">*</span>
                                </label>
                                <input
                                    className="font-semibold px-4 py-2 rounded border-2"
                                    placeholder={"Lưu lượng xả Kanak"}
                                    value={luuLuongXaKanak}
                                    onChange={(e) => setLuuLuongXaKanak(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-start font-semibold">
                                    Số liệu mưa giữa Kanak - An Khê tại thời điểm t (m3) <span
                                    className="text-red-600">*</span>
                                </label>
                                <input
                                    className="font-semibold px-4 py-2 rounded border-2"
                                    placeholder={"Số liệu mưa giữa Kanak - An Khê"}
                                    value={soLieuMuaGiuaKanakAnKhe}
                                    onChange={(e) => setSoLieuMuaGiuaKanakAnKhe(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-start font-semibold">
                                    Lưu lượng nước đến hồ An Khê tại thời điểm t <span className="text-red-600">*</span>
                                </label>
                                <input
                                    className="font-semibold px-4 py-2 rounded border-2"
                                    placeholder={"Lưu lượng nước đến hồ An Khê"}
                                    value={luuLuongNuocDenHoAnKhe}
                                    onChange={(e) => setLuuLuongNuocDenHoAnKhe(e.target.value)}
                                />
                            </div>
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
                                        onChange={handleFileChange}
                                    />
                                </div>

                            </>
                        )}
                        <div className="mt-5">
                            <button
                                onClick={(e) => handleSubmit(e)}
                                className="bg-[#6EE7B7] font-semibold px-6 py-4 rounded hover:bg-[#10b981] focus:border-2 focus:border-[#10b981]">Dự
                                đoán
                            </button>
                        </div>
                        {
                            result && <Result data={result.data}/>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
