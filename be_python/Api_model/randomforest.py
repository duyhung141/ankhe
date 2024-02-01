import joblib
import numpy as np
import pandas as pd


def load_model():
    global loaded_rf_model_t2, loaded_rf_model_t4, loaded_rf_model_t6, loaded_rf_model_t8, test
    loaded_rf_model_t2 = joblib.load('best_model/best_rf_model_t_2.pkl')
    loaded_rf_model_t4 = joblib.load('best_model/best_rf_model_t_4.pkl')
    loaded_rf_model_t6 = joblib.load('best_model/best_rf_model_t_6.pkl')
    loaded_rf_model_t8 = joblib.load('best_model/best_rf_model_t_12.pkl')
    test = pd.DataFrame()


def input_process(x1, x2, x3):
    test['Tổng lưu lượng xả (m³/s)[Thực tế] - t'] = [x1]
    test['SoMua'] = [x2]
    test['Lưu lượng đến hồ (m³/s) - t'] = [x3]
    array_tongxa = test['Tổng lưu lượng xả (m³/s)[Thực tế] - t'].values
    array_somua = test['SoMua'].values
    array_luuluongden = test['Lưu lượng đến hồ (m³/s) - t'].values

    predict_t2 = loaded_rf_model_t2.predict(test)
    predict_t4 = loaded_rf_model_t4.predict(test)
    predict_t6 = loaded_rf_model_t6.predict(test)
    predict_t8 = loaded_rf_model_t8.predict(test)

    encode_output = output_encoding(array_tongxa, array_somua, array_luuluongden, predict_t2, predict_t4, predict_t6,
                                    predict_t8)
    print(encode_output)
    return encode_output


def input_process_excel(path):
    df = pd.read_excel(path)
    array_tongxa = df['Tổng lưu lượng xả (m³/s)[Thực tế]-t'].values
    array_somua = df['SoLieuMua'].values
    array_luuluongden = df['Lưu lượng đến hồ (m³/s)-t'].values
    predict_t2 = loaded_rf_model_t2.predict(df)
    predict_t4 = loaded_rf_model_t4.predict(df)
    predict_t6 = loaded_rf_model_t6.predict(df)
    predict_t8 = loaded_rf_model_t8.predict(df)
    encode_output = output_encoding(array_tongxa, array_somua, array_luuluongden, predict_t2, predict_t4, predict_t6,
                                    predict_t8)
    print(encode_output)
    return encode_output


def input_process_csv(path):
    df = pd.read_csv(path)
    array_tongxa = df['Tổng lưu lượng xả (m³/s)[Thực tế] - t'].values
    array_somua = df['SoLieuMua'].values
    array_luuluongden = df['Lưu lượng đến hồ (m³/s) - t'].values
    predict_t2 = loaded_rf_model_t2.predict(df)
    predict_t4 = loaded_rf_model_t4.predict(df)
    predict_t6 = loaded_rf_model_t6.predict(df)
    predict_t8 = loaded_rf_model_t8.predict(df)
    encode_output = output_encoding(array_tongxa, array_somua, array_luuluongden, predict_t2, predict_t4, predict_t6,
                                    predict_t8)
    # print(encode_output)
    return encode_output


def output_encoding(array_tongxa, array_somua, array_luuluongden, predict_t2, predict_t4, predict_t6, predict_t8):
    array_tongxa_list = array_tongxa.tolist() if isinstance(array_tongxa, np.ndarray) else array_tongxa
    array_somua_list = array_somua.tolist() if isinstance(array_somua, np.ndarray) else array_somua
    array_luuluongden_list = array_luuluongden.tolist() if isinstance(array_luuluongden,
                                                                      np.ndarray) else array_luuluongden
    predict_t2_list = predict_t2.tolist() if isinstance(predict_t2, np.ndarray) else predict_t2
    predict_t4_list = predict_t4.tolist() if isinstance(predict_t4, np.ndarray) else predict_t4
    predict_t6_list = predict_t6.tolist() if isinstance(predict_t6, np.ndarray) else predict_t6
    predict_t8_list = predict_t8.tolist() if isinstance(predict_t8, np.ndarray) else predict_t8

    response = {
        "status": True,
        'result_x1': array_tongxa_list,
        'result_x2': array_somua_list,
        'result_x3': array_luuluongden_list,
        "results_t2": predict_t2_list,
        "results_t4": predict_t4_list,
        "results_t6": predict_t6_list,
        "results_t12": predict_t8_list,
        "error": []
    }
    return response


def main():
    load_model()
    print(input_process(22.0, 2.2, 25.72))


# run()
if __name__ == '__main__':
    main()
