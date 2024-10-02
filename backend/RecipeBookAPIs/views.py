from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, LoginSerializer, ChefSerializer, RecipeSerializer
from .authentication import CustomJWTAuthentication
from .models import User, Chef, Recipe
import jwt
import datetime
from django.conf import settings
from django.http import JsonResponse
from rest_framework.pagination import PageNumberPagination

# Sign Up View
class SignUpView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User successfully created",
                "user_id": str(user.user_id)
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def create_jwt(self, user):
        payload = {
            'user_id': str(user.user_id),
            'username': user.user_name,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token

    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)

        if serializer.is_valid():
            user = User.objects.get(user_name=serializer.validated_data['user_name'])
            token = self.create_jwt(user)

            response = JsonResponse({'message': 'Login successful', 'token': token}, status=status.HTTP_200_OK)
            response.set_cookie(
                key='jwt_token',
                value=str(token),
                httponly=True,
                secure=True,
                samesite='None'
            )

            return response
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Check Authentication View
class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'Authenticated'}, status=status.HTTP_200_OK)

# Home View
class Home(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

# Custom Pagination for Recipes
class RecipePagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'size'
    max_page_size = 100

# Recipe List View with Pagination
class RecipeListView(APIView):
    permission_classes = [AllowAny]
    pagination_class = RecipePagination

    def get(self, request):
        recipes = Recipe.objects.all()
        
        # Apply pagination
        paginator = RecipePagination()
        result_page = paginator.paginate_queryset(recipes, request)
        
        if result_page is not None:
            serializer = RecipeSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)

# Chef List View with Pagination
class ChefListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        chefs = Chef.objects.all()
        
        # Apply pagination
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(chefs, request)
        
        if result_page is not None:
            serializer = ChefSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        serializer = ChefSerializer(chefs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)