from flask import Flask, render_template, request,render_template,redirect
from waitress import serve
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields,marshal_with,abort

app = Flask(__name__)