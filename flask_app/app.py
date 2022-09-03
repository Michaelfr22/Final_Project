import psycopg2
from config import DB_HOST, DB_USER, DB_PASS, DB_PORT
from flask import Flask, render_template, jsonify, request

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
    cur.execute(f'select json_agg(t) from( select * FROM {table_name} ) t')
    db_table = cur.fetchall()
    cur.close()
    conn.close()
    return db_table

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tableau')
def tableau():
    return render_template('tableau.html')

@app.route('/analysis')
def analysis():
    per_capita = get_data('per_capita')
    state_table = get_data('state_emissions')
    merged_table = get_data('gdp_pop_sector_emissions')
    return render_template('analysis.html', 
        per_capita = per_capita, 
        state_data = state_table,
        merged_data = merged_table)

@app.route('/model')
def model():
    return render_template('model.html')

if __name__ == "__main__":
    app.run()