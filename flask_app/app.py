import psycopg2
from config import DB_HOST, DB_USER, DB_PASS, DB_PORT
from flask import Flask, render_template, jsonify

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host=DB_HOST,
                            database='us_emissions_db',
                            user=DB_USER,
                            password=DB_PASS,
                            port=DB_PORT)
    return conn

def get_data(table_name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(f'SELECT * FROM {table_name};')
    db_table = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(db_table)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analysis')
def analysis():
    sector_emissions = get_data('sector_emissions')
    return render_template('analysis.html', data = sector_emissions)


if __name__ == '__main__':
    app.run()