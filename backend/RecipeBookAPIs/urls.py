from django.urls import path
from .views import SignUpView, LoginView, Home, CheckAuthView, RecipeListView, ChefListView

urlpatterns = [
    path('', Home.as_view()),
    path('api/signup/', SignUpView.as_view(), name='user-signup'),
    path('api/login/', LoginView.as_view(), name='user_login'),
    path('api/check-auth/', CheckAuthView.as_view(), name='check-auth'),
    path('api/recipes/', RecipeListView.as_view(), name='recipe-list'),
    path('api/chefs/', ChefListView.as_view(), name='chef-list'),
]