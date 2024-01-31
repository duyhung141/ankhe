import React, {useEffect} from "react"
import Table from "../../component/Table/Table";
import image1 from "../../assets/img/image 1.png"
import image2 from "../../assets/img/image 2.png"
import Input from "../../component/Input/Input";
import Result from "../../component/Result/Result";
import * as PredictService from "../../service/PredictService";

function HomePage() {
    const headers1 = [
        "Tên hồ",
        "Hiện tại",
        "Thời điểm cập nhật lần cuối",
        "Mực nước thượng lưu (m)",
        "Mực nước dâng bình thường (m)",
        "Mực nước chết (m)",
        "Lưu lượng đến hồ (m3/s)",
        "Tổng lượng xả (m3/s)",
        "Tổng lượng xả qua đập tràn (m3/s)",
        "Tổng lượng xả qua nhà máy (m3/s)",
        "Số cửa xả sâu",
        "Số cửa xả mặt"
    ]

    const headers2 = [
        "Thời điểm",
        "Lưu lượng đến hồ An Khê (m3/s)",
    ]

    const headerExcel = [
        "Tổng lưu lượng xả Kanak thời điểm t (m3)",
        "Số liệu mưa giữa Kanak - An Khê tại thời điểm t (m3)",
        "Lưu lượng nước đến hồ An Khê thời điểm t (m3)",
        "Thời điểm t + 1",
        "Thời điểm t + 2",
        "Thời điểm t + 3",
        "Thời điểm t + 4",
    ]


    const [dataCrawl, setDataCrawl] = React.useState(null)
    const [luuLuongXaKanak, setLuuLuongXaKanak] = React.useState("");
    const [soLieuMuaGiuaKanakAnKhe, setSoLieuMuaGiuaKanakAnKhe] = React.useState("");
    const [luuLuongNuocDenHoAnKhe, setLuuLuongNuocDenHoAnKhe] = React.useState("");
    const [amountRain, setAmountRain] = React.useState(null)
    const [importExcel, setImportExcel] = React.useState(null)
    const [file, setFile] = React.useState(null);
    const [result, setResult] = React.useState(null)
    const [warning, setWarning] = React.useState(false)
    const handleWarning = () => {
        console.log(warning)
        if (importExcel) {
            setWarning(false)
            if (!file) {
                setWarning(true)
                alert("Bạn chưa chọn file excel")
            }
        } else {
            setWarning(false)
            if (!luuLuongXaKanak || !soLieuMuaGiuaKanakAnKhe || !luuLuongNuocDenHoAnKhe) {
                console.log('vào đây', importExcel)
                setWarning(true)
                alert("Bạn chưa nhập đủ thông tin")
            }
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        handleWarning()
        let data = {}
        if (!warning) {
            console.log("chạy submit")
            if (importExcel && file) {
                const fileType = file.type;
                const formData = new FormData();
                formData.append('file', file);
                formData.append('fileName', file.name);
                if (fileType == "text/csv") {
                    data = await PredictService.predict_csv(formData);

                }
                // handle import excel
                else {
                    data = await PredictService.predict_xlsx(formData);
                }
            } else {
                // handle input
                data = await PredictService.predict(luuLuongXaKanak, soLieuMuaGiuaKanakAnKhe, luuLuongNuocDenHoAnKhe);
            }
            setResult(data)
        }
    }

    const getAmountRain = async () => {
        const data = await PredictService.getAmountRain();
        console.log(data)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await PredictService.getAmountRain();
            if (data) {
                setAmountRain(data?.data?.t)
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await PredictService.crawl(amountRain);
            setDataCrawl(data);
            console.log(data)
        };

        fetchData();
    }, [amountRain]);


    return (
        <>
            <div className="container mx-auto p-6">
                <div className="">
                    <h3 className="text-start text-lg text-[#0891B2] font-medium py-1 md:text-3xl md:py-2">Thông tin vận
                        hành hồ chứa An Khê - Kanak</h3>
                    <table className="">
                        <thead className="bg-[#0d9488]/30 text-[#0d9488]">
                        <tr>
                            {headers1.map((header, index) => (
                                <th key={index} className="border border-gray-400 px-4 py-2">
                                    {header}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            className="hover:bg-gray-100 hover:cursor-pointer"
                        >
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                Kanak
                            </td>
                            {dataCrawl && dataCrawl?.data_KaNak_final.map((item, i) => (
                                <>
                                    <td
                                        className="border border-gray-400 px-4 py-2"
                                    >
                                        {item}
                                    </td>
                                </>
                            ))}

                        </tr>
                        <tr
                            className="hover:bg-gray-100 hover:cursor-pointer"
                        >
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                An Khê
                            </td>
                            {dataCrawl && dataCrawl?.data_AnKhe_final.map((item, i) => (
                                <>
                                    <td
                                        className="border border-gray-400 px-4 py-2"
                                    >
                                        {item}
                                    </td>
                                </>
                            ))}

                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-10">
                    <h3 className="text-start text-lg text-[#0891B2] font-medium py-1 md:text-3xl md:py-2">Dự báo lưu
                        lượng nước đến hồ chứa An Khê </h3>
                    <table className="">
                        <thead className="bg-[#059669]/30 text-[#059669]">
                        <tr>
                            {headers2.map((header, index) => (
                                <th key={index} className="border border-gray-400 px-4 py-2">
                                    {header}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            className="hover:bg-gray-100 hover:cursor-pointer"
                        >
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                Sau 2 giờ
                            </td>
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                {dataCrawl?.predict_t2}
                            </td>
                        </tr>
                        <tr
                            className="hover:bg-gray-100 hover:cursor-pointer"
                        >
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                Sau 4 giờ
                            </td>
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                {dataCrawl?.predict_t4}
                            </td>
                        </tr>
                        <tr
                            className="hover:bg-gray-100 hover:cursor-pointer"
                        >
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                Sau 6 giờ
                            </td>
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                {dataCrawl?.predict_t6}
                            </td>
                        </tr>
                        <tr
                            className="hover:bg-gray-100 hover:cursor-pointer"
                        >
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                Sau 8 giờ
                            </td>
                            <td
                                className="border border-gray-400 px-4 py-2"
                            >
                                {dataCrawl?.predict_t8}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="my-10">
                    <iframe width="720" height="480" className="mx-auto"
                            src="https://embed.windy.com/embed2.html?lat=13.966&lon=108.632&detailLat=13.966&detailLon=108.632&width=1440&height=720&zoom=11&level=surface&overlay=rainAccu&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
                            frameBorder="0"></iframe>
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
                        <div className="my-5">
                            <button
                                onClick={(e) => handleSubmit(e)}
                                className="bg-[#6EE7B7] font-semibold px-6 py-4 rounded hover:bg-[#10b981] focus:border-2 focus:border-[#10b981]">Dự
                                đoán
                            </button>
                        </div>
                        {
                            importExcel ?
                                (result && <Table headers={headerExcel} datas={result}/>) :
                                (result && <Result data={result.data}/>)
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
