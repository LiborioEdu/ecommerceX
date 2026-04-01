from rest_framework import serializers
from .models import Category, Product, Order, OrderItem
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'stock', 'image', 'category', 'category_name', 'created_at'
        ]    
        
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ("username", "email", "password")
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user
    
class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_image = serializers.ImageField(source='product.image', read_only=True, allow_null=True)
    product_category = serializers.ReadOnlyField(source='product.category.name')

    class Meta:
        model = OrderItem
        fields = ['product', 'product_name', 'product_image', 'product_category', 'quantity', 'price']
        read_only_fields = ['price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True) # Aceita uma lista de itens

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'total_price', 'status', 'items']
        read_only_fields = ['user', 'total_price']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        # O backend não deve confiar no total_price. Começa com 0.
        validated_data['total_price'] = 0
        order = Order.objects.create(**validated_data) # Cria o pedido principal
        
        calculated_total = 0
        # Cria cada item vinculado a esse pedido, usando preços reais
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            current_price = product.price # Valor real extraído do DB
            
            OrderItem.objects.create(
                order=order, 
                product=product,
                quantity=quantity,
                price=current_price
            )
            calculated_total += current_price * quantity
            
        # Atualiza a order de forma autoritária e final
        order.total_price = calculated_total
        order.save()
        
        return order