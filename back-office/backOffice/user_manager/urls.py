from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_form),
    path('list/',views.user_list),
    path('insert/',views.user_form),
    path('update/',views.user_update),
    path('delete/<pk>',views.user_delete)
]
