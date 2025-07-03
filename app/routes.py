from flask import render_template, request, redirect
from app import app, db
from app.models import Entry

#jedi = "of the jedi"

@app.route('/')
@app.route('/index')
def index():
    # entries = [
    #     {
    #         'id' : 1,
    #         'title': 'test title 1',
    #         'description' : 'test desc 1',
    #         'status' : True
    #     },
    #     {
    #         'id': 2,
    #         'title': 'test title 2',
    #         'description': 'test desc 2',
    #         'status': False
    #     }
    # ]
    #entries = Entry.query.all()
    return render_template('home.html')

@app.route('/add', methods=['POST'])
def add():
    if request.method == 'POST':
        form = request.form
        username= form.get('username')
        email = form.get('email')
        cellno = form.get('cellno')
        pwsd = form.get('pwsd')
        if not title or description:
            entry = Entry(username = username, email = email, cellno = cellno, pwsd = pwsd)
            db.session.add(entry)
            db.session.commit()
            return redirect('/')

    return "access denied"

@app.route('/update/<int:id>')
def updateRoute(id):
    if not id or id != 0:
        entry = Entry.query.get(id)
        if entry:
            return render_template('update.html', entry=entry)

    return "access denied"

@app.route('/update/<int:id>', methods=['POST'])
def update(id):
    if not id or id != 0:
        entry = Entry.query.get(id)
        if entry:
            form = request.form
            entry.username = form.get('username')
            entry.email = form.get('email') 
            entry.cellno = form.get('cellno')
            entry.pwsd = form.get('pwsd')
            db.session.commit()
        return redirect('/')

    return "access denied"



@app.route('/delete/<int:id>')
def delete(id):
    if not id or id != 0:
        entry = Entry.query.get(id)
        if entry:
            db.session.delete(entry)
            db.session.commit()
        return redirect('/')

    return "access denied"

@app.route('/turn/<int:id>')
def turn(id):
    if not id or id != 0:
        entry = Entry.query.get(id)
        if entry:
            entry.status = not entry.status
            db.session.commit()
        return redirect('/')

    return "access denied"

# @app.errorhandler(Exception)
# def error_page(e):
#     return "of the jedi"
