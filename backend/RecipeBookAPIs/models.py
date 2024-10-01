from django.db import models
import uuid

# Create your models here.
class User(models.Model):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=254)
    user_name = models.CharField(max_length=50, unique=True, null=False, blank=False)
    password = models.CharField(max_length=128, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_authenticated(self):
        """Always return True. This is a way to tell if the user is logged in."""
        return True

    def __str__(self) -> str:
        return "[ Username : " + self.user_name + " Email: " + self.email + " Created At: "+str(self.created_at)+"]"

class Chef(models.Model):
    chef_id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    chef_full_name = models.CharField(max_length = 100)
    chef_details = models.TextField(blank=True)
    chef_img_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return "[ Chef Name : " + self.chef_full_name + " Chef Details: " + self.chef_details + "]"

class Recipe(models.Model):
    recipe_id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    recipe_name = models.CharField(max_length=250)
    recipe_description = models.TextField(blank=True)
    recipe_ingredients = models.JSONField(blank=True)
    recipe_duration = models.PositiveIntegerField(blank=True)
    recipe_instructions = models.TextField(blank=True)
    recipe_img_url = models.URLField(blank=True)
    recipe_chef_xref = models.ForeignKey(Chef, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return "[ Recipe Name : " + self.recipe_name + "]"

class RecipeBook(models.Model):
    recipe_book_id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    book_user_xref = models.ForeignKey(User, on_delete=models.CASCADE)
    book_recipe_xref = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"[ {self.book_user_xref.user_name}'s recipebook ]" 

