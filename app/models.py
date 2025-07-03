from app import db

class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, nullable=False)
    email = db.Column(db.String(60), index=True, nullable=False)
    cellno = db.Column(db.String(10), index=True, nullable=False)
    pwsd = db.Column(db.String(120), index=True, nullable=False)
    
    
    