from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, LoginSerializer, ChefSerializer, RecipeSerializer
from rest_framework.permissions import IsAuthenticated
from .authentication import CustomJWTAuthentication
from .models import User, Chef, Recipe, RecipeBook
import jwt
import datetime
from django.conf import settings
from django.http import JsonResponse

# Create your views here.
class SignUpView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        # Get the data from request
        data = request.data

        # Send the data to serializer
        serializer = UserSerializer(data = data)

        # Validate the data and save the data if it is valid
        if serializer.is_valid():
            user_id = serializer.save()
            return Response({
                "message":"User successfully created",
                "user_id": str(user_id)
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(APIView):
    permission_classes = [AllowAny]

    def create_jwt(self, user):
        payload = {
            'user_id': str(user.user_id),
            'username': user.user_name,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),  # Token expires in 1 day
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token

    def post(self, request):

        # Get the data from the request
        data = request.data

        # Send data to the serializer
        serializer = LoginSerializer(data = data)

        # Validate the data
        if(serializer.is_valid()):

            user = User.objects.get(user_name=serializer.validated_data['user_name'])

            token = self.create_jwt(user)

            response = JsonResponse({'message': 'Login successful','token': token}, status=status.HTTP_200_OK)
            response.set_cookie(
                key='jwt_token',
                value=str(token),
                httponly=True,
                secure=True,
                samesite='None'
            )

            # return Response({
            #     'message': 'Login Successful',
            #     'token': token
            # }, status=status.HTTP_200_OK)
            return response
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # If the request reaches here, it means the user is authenticated
        return Response({'message': 'Authenticated'}, status=200)
        
class Home(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)
    
class RecipeListView(APIView):
    def get(self, request, *args, **kwargs):
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ChefListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        chefs = Chef.objects.all()
        serializer = ChefSerializer(chefs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
