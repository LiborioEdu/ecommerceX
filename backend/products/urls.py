from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # Faltou importar estas!
from .views import CategoryViewSet, ProductViewSet, RegisterView, me

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)

urlpatterns = [
    # Rotas do Router (Categories e Products)
    path('', include(router.urls)),

    # Rotas de Autenticação (Ajustei o caminho para ficar limpo)
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # LOGIN
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # REFRESH
    
    # Rota de Profile
    path('me/', me, name='user_me'),
]