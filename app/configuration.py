
class Config(object):
	"""
	Configuration base, for all environments.
	
	DEBUG = False
	TESTING = False
    """
	SQLALCHEMY_DATABASE_URI = 'sqlite:///application.db'
	SECRET_KEY = "MINHACHAVESECRETA"
    
"""
	BOOTSTRAP_FONTAWESOME = True
	
	CSRF_ENABLED = True
	SQLALCHEMY_TRACK_MODIFICATIONS = True
    """
	#Get your reCaptche key on: https://www.google.com/recaptcha/admin/create
	#RECAPTCHA_PUBLIC_KEY = "6LffFNwSAAAAAFcWVy__EnOCsNZcG2fVHFjTBvRP"
	#RECAPTCHA_PRIVATE_KEY = "6LffFNwSAAAAAO7UURCGI7qQ811SOSZlgU69rvv7"

class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = 'mysql://user@localhost/foo'
	SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
	DEBUG = True

class TestingConfig(Config):
	TESTING = True
