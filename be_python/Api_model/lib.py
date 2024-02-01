import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import joblib
import pandas as pd
import numpy as np


def load_model():
    global loaded_rf_model_t2, loaded_rf_model_t4, loaded_rf_model_t6, loaded_rf_model_t8, test
    loaded_rf_model_t2 = joblib.load('best_model/best_rf_model_t_2.pkl')
    loaded_rf_model_t4 = joblib.load('best_model/best_rf_model_t_4.pkl')
    loaded_rf_model_t6 = joblib.load('best_model/best_rf_model_t_6.pkl')
    loaded_rf_model_t8 = joblib.load('best_model/best_rf_model_t_8.pkl')
    test = pd.DataFrame()


def get_current_datetime():
    return datetime.now().strftime("%d/%m/%Y %H:00")


def generate_url(base_url, current_datetime, hc):
    date_part, time_part = current_datetime.split()
    return f"{base_url}?td={date_part}%20{time_part}&vm=&lv=15&hc={hc}"


def crawl_data(url):
    data = []
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    td_elements = soup.select('.tdclass')

    for td in td_elements:
        data.append(td.get_text())
    return data


def output_encoding(data_KaNak_final, data_AnKhe_final, predict_t2, predict_t4, predict_t6, predict_t8):
    predict_t2_list = predict_t2.tolist() if isinstance(predict_t2, np.ndarray) else predict_t2
    predict_t4_list = predict_t4.tolist() if isinstance(predict_t4, np.ndarray) else predict_t4
    predict_t6_list = predict_t6.tolist() if isinstance(predict_t6, np.ndarray) else predict_t6
    predict_t8_list = predict_t8.tolist() if isinstance(predict_t8, np.ndarray) else predict_t8
    response = {
        'stautus': True,
        'data_KaNak_final': data_KaNak_final,
        'data_AnKhe_final': data_AnKhe_final,
        'predict_t2': predict_t2_list,
        'predict_t4': predict_t4_list,
        'predict_t6': predict_t6_list,
        'predict_t8': predict_t8_list,
        'error': []
    }
    return response


# def input_processing(data_AnKhe_final, data_KaNak_final):
#     df = pd.DataFrame()
#     tongxa_kanak_t = float(data_KaNak_final[6])
#     solieumua_t = 0.2
#     luuluongden_ankhe_t = float(data_AnKhe_final[5])
#     df['Tổng lưu lượng xả (m³/s)[Thực tế] - t'] = [tongxa_kanak_t]
#     df['SoMua'] = [solieumua_t]
#     df['Lưu lượng đến hồ (m³/s) - t'] = [luuluongden_ankhe_t]
#     predict_t2 =loaded_rf_model_t2.predict(df)
#     predict_t4 = loaded_rf_model_t4.predict(df)
#     predict_t6 = loaded_rf_model_t6.predict(df)
#     predict_t8 = loaded_rf_model_t8.predict(df)
#     results = output_encoding(data_KaNak_final, data_AnKhe_final, predict_t2, predict_t4, predict_t6, predict_t8)
#     return results


def input_processing(data_AnKhe_final, data_KaNak_final, somua):
    df = pd.DataFrame()
    # Kiểm tra và gán giá trị cho tongxa_kanak_t
    if len(data_KaNak_final) == 11:
        tongxa_kanak_t = float(data_KaNak_final[6])
    else:
        data_KaNak_final = [data_AnKhe_final[0],
                            data_AnKhe_final[1],
                            '456.5',
                            '515',
                            '485',
                            '8.81',
                            '22',
                            '0',
                            '22',
                            '0',
                            '0']
        tongxa_kanak_t = 22  # Gán giá trị mặc định

    # solieumua_t = 0.2
    solieumua_t = somua

    # Kiểm tra và gán giá trị cho luuluongden_ankhe_t
    if len(data_AnKhe_final) == 11:
        luuluongden_ankhe_t = float(data_AnKhe_final[5])
    else:
        luuluongden_ankhe_t = 25.36  # Gán giá trị mặc định

    df['Tổng lưu lượng xả (m³/s)[Thực tế] - t'] = [tongxa_kanak_t]
    df['SoMua'] = [solieumua_t]
    df['Lưu lượng đến hồ (m³/s) - t'] = [luuluongden_ankhe_t]
    predict_t2 = loaded_rf_model_t2.predict(df)
    predict_t4 = loaded_rf_model_t4.predict(df)
    predict_t6 = loaded_rf_model_t6.predict(df)
    predict_t8 = loaded_rf_model_t8.predict(df)
    results = output_encoding(data_KaNak_final, data_AnKhe_final, predict_t2, predict_t4, predict_t6, predict_t8)
    return results
