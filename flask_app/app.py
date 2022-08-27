import os
import psycopg2
from config import DB_HOST, DB_USER, DB_PASS, DB_PORT
from flask import Flask, render_template

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host=DB_HOST,
                            database='us_emissions_db',
                            user=DB_USER,
                            password=DB_PASS,
                            port=DB_PORT)
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM sector_emissions;')
    sector_emissions = cur.fetchall()
    #for row in sector_emissions:
        #print(row)
    cur.close()
    conn.close()
    return render_template('index.html', sector_emissions=sector_emissions)
