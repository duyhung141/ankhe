import flask
from flask import Flask
from flask_cors import CORS
import  randomforest
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER_CSV = 'file_csv'
UPLOAD_FOLDER_XLSX = 'file_xlsx'
ALLOWED_EXTENSIONS = {'csv', 'xlsx'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER_CSV'] = UPLOAD_FOLDER_CSV
app.config['UPLOAD_FOLDER_XLSX'] = UPLOAD_FOLDER_XLSX
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict_excel', methods=['POST'])
def predict_v1_excel():

    file = flask.request.files.get('file')
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER_XLSX'], filename)
        file.save(file_path)
        result = randomforest.input_process_excel(file_path)
        return flask.jsonify(result)


@app.route('/predict_csv', methods=['POST'])
def predict_v1_csv():
    # file = flask.request.files.get('csv')
    file = flask.request.files.get('file')
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER_CSV'], filename)
        file.save(file_path)
        result = randomforest.input_process_csv(file_path)
        return flask.jsonify(result)

@app.route('/predict', methods=['POST'])
def predict_v1():
    x1 = float(flask.request.args.get('x1'))
    x2 = float(flask.request.args.get('x2'))
    x3 = float(flask.request.args.get('x3'))
    result = randomforest.input_process(x1, x2, x3)
    print(type(flask.jsonify(result)))
    return flask.jsonify(result)        

if __name__ == '__main__':  
    randomforest.load_model()
    app.run(debug=False, host='0.0.0.0')
