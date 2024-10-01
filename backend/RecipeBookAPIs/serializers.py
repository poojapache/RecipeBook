from rest_framework import serializers
from .models import User, Chef, Recipe
from argon2 import PasswordHasher
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id','user_name','password','email','created_at']

    def validate(self, data):

        #Validation for username
        username_regex = r'^[A-Za-z]\w{5,29}$'
        if not(re.match(username_regex, data['user_name'])):
            raise serializers.ValidationError("Username can only contain alphabets, numbers, underscore and needs to be atleast 6 characters long.")
        
        #Validation for password
        password_regex = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not(re.match(password_regex, data['password'])):
            raise serializers.ValidationError("Password should contain at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8.")
        
        #Validation for email
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not(re.match(email_regex, data['email'])):
            raise serializers.ValidationError("Invalid Email")
        
        return data
    
    def create(self, validated_data):
        # Create Hashed password
        hashed_pwd = PasswordHasher().hash(validated_data['password'])

        # Create the user object and save it in the db
        user = User(
            email = validated_data['email'],
            user_name = validated_data['user_name'],
            password = hashed_pwd,
        )
        
        user.save()

        return user.user_id
    
class LoginSerializer(serializers.Serializer):

    # We are not using ModelSerializer because create() is called everytime is_valid() is called in views.py.
    # Meta class is not required for normal Serializer. Instead we intiailize the variable as follows.
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    
    def validate(self, data):

        user_name = data['user_name'].strip()
        password = data['password'].strip()

        if user_name and password:
            try:
                # Check if user exists
                user = User.objects.get(user_name = user_name)

                # Verify if password matches
                PasswordHasher().verify(user.password, password)

            except User.DoesNotExist:
                raise serializers.ValidationError('Invalid user or password')
            except:
                raise serializers.ValidationError('Internal Server error')
        else:
                raise serializers.ValidationError("Username and password cannot be blank")
            
        return data


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

class ChefSerializer(serializers.ModelSerializer):

    recipes = RecipeSerializer(many=True, read_only=True)
    
    class Meta:
        model = Chef
        fields = '__all__'

