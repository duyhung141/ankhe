import flask
from flask import Flask, request
import lib
import os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
global base_url
base_url = "https://phongchongthientai.evn.com.vn/PageHoChuaThuyDienEmbedEVN.aspx"

@app.route('/crawl', methods=['GET'])
def crawl():
    somua = float(request.args.get('somua'))
    current_datetime = lib.get_current_datetime()
    # Ankhe
    url_Ankhe = lib.generate_url(base_url, current_datetime, 19)
    data_AnKhe = lib.crawl_data(url_Ankhe)
    time_curent_Ankhe = current_datetime
    data_final_Ankhe = [time_curent_Ankhe] + data_AnKhe
    #KaNak
    url_Kanak = lib.generate_url(base_url, current_datetime, 20)
    data_Kanak = lib. crawl_data(url_Kanak)
    time_curent_Kanak = current_datetime
    data_KaNak_final = [time_curent_Kanak] + data_Kanak
    results = lib.input_processing(data_final_Ankhe, data_KaNak_final, somua)
    response = flask.jsonify(results)
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response
if __name__ == '__main__':
    lib.load_model()
    app.run(debug=False, host='0.0.0.0', port=5001)