import axios from "axios";

export const predict = async (x1, x2, x3) => {
    const res = await axios.post(`http://127.0.0.1:5000/predict?x1=${x1}&x2=${x2}&x3=${x3}`);
    return res
}

export const predict_xlsx = async (formData) => {
    try {
        const res = await axios.post(`http://127.0.0.1:5000/predict_excel`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error predicting with file:', error);
        throw error;
    }
}

export const predict_csv = async (formData) => {
    try {
        const res = await axios.post(`http://127.0.0.1:5000/predict_csv`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error predicting with file:', error);
        throw error;
    }
}

export const crawl = async () => {
    try {
        const res = await axios.get(`http://192.168.1.7:5001/crawl`);
        return res.data;
    } catch (error) {
        console.error('Error predicting with file:', error);
    }
}