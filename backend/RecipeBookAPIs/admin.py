from django.contrib import admin

# Register your models here.
from .models import User, Chef, Recipe, RecipeBook

admin.site.register(User)
admin.site.register(Chef)
admin.site.register(Recipe)
admin.site.register(RecipeBook)
