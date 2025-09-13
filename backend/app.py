from flask import Flask, make_response, jsonify
from flask_cors import CORS
from bd import dados_agro

app = Flask(__name__)
CORS(app)

@app.route('/dados', methods=['GET'])
def get_dados():
    return make_response(jsonify(dados_agro))

if __name__ == '__main__':
    app.run()