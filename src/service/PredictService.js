import axios from "axios";

export const predict = async (x1, x2, x3) => {
    const res = await axios.post(`http://127.0.0.1:5000/predict?x1=${x1}&x2=${x2}&x3=${x3}`);
    return res
}

export const predict_xlsx = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`http://127.0.0.1:5000/predict_excel`, formData);
    return res
}