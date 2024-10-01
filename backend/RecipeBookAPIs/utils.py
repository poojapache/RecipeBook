# utils.py
import jwt
import datetime
from django.conf import settings

def generate_jwt(user):
    # Create a payload with user information
    payload = {
        'user_id': str(user.user_id),  # or user.user_name
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24),  # Token expiry
        'iat': datetime.datetime.utcnow()  # Issued at
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

def verify_jwt(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload  # Return payload if token is valid
    except jwt.ExpiredSignatureError:
        return None  # Token expired
    except jwt.InvalidTokenError:
        return None  # Invalid token
