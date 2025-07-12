import os
from flask import Flask, url_for, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)
languages =""
my_dir = os.path.dirname(__file__)
json_file_path = os.path.join(my_dir, "static/data/languages.json")
#f = open("static/data/languages.json")
def getLangs():
    global languages
    f = open(json_file_path)
    languages=f.read()
    print(f.read())
    f.close()
getLangs()    
@app.route('/getlanguages', methods=['GET', 'POST'])
def getlanguages():
    global languages
    return languages   


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    email = db.Column(db.String(100))
    cellno = db.Column(db.String(10))
    password = db.Column(db.String(100))
    def __init__(self, username,email,cellno,password):
        self.username = username
        self.email = email
        self.cellno = cellno
        self.password = password
    app.secret_key = "ThisIsNotASecret:p"
   

@app.route('/', methods=['GET'])
def index():
   
    if session.get('logged_in'):
        return render_template('index.html',message="Hello and Welcome!!")
    else:
        return render_template('index.html', message="Hello and Welcome!!")

@app.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            db.session.add(User(username=request.form['username'], email=request.form['email'], cellno=request.form['cellno'], password=request.form['password']))
            db.session.commit(), 
            return render_template('home2.html',message=request.form['username'] , is_post=True)

        #return render_template('simple.html', is_post=True, …)
        except:
            return render_template('index.html', message="User Already Exists", is_post=False)
    else:
        return render_template('register.html', message="Hello and Welcome", is_post=False)


@app.route('/login/', methods=['GET', 'POST'])
def login():
    global languages
    if request.method == 'GET':
        return render_template('index.html', message="Register", is_post=False)
    else:
        u = request.form['username']       
        p = request.form['password']
        data = User.query.filter_by(username=u, password=p).first()
        if data is not None:
            session['logged_in'] = True
            return render_template('home2.html',message=request.form['username'] ,langs=languages, is_post=True)
        return render_template('index.html', message="Incorrect Details", is_post=False)


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session['logged_in'] = False
    return render_template('index.html', message="Logged out", is_post=False)

if(__name__ == '__main__'):
    app.secret_key = "ThisIsNotASecret:p"
    with app.app_context():
        db.create_all()
        port = int(os.environ.get("PORT", 5000))
        app.run(host='0.0.0.0', port=port)
        
   //f app.run(debug=True)
    
#https://github.com/627DevLabs/appfox
#git remote add origin https://github.com/627DevLabs/appfox.git
#git commit -m "App83 load 1"
#git config --global user.email "627devlab@gmail.com"
 #back in history, before material,
 