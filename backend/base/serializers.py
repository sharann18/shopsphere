from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'name', 'email', 'is_admin']
    
    def get__id(self, object):
        return object.id
    
    def get_name(self, object):
        name = object.first_name

        if name == '':
            name = object.email
        
        return name
    
    def get_is_admin(self, object):
        return object.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'name', 'email', 'is_admin', 'token']
    
    def get_token(self, object):
        token = RefreshToken.for_user(object)
        return str(token)