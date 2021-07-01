from user_manager.models import User
from .serializers import UserSerializer 
from .models import User

from django.http.response import JsonResponse
from django.http import HttpResponse

from rest_framework import status
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated


from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@api_view(['GET',])
@csrf_exempt 
@permission_classes((IsAuthenticated,))
def user_list(request):
    if request.method =='GET':
        users = User.objects.all()
        users_serializer = UserSerializer(users,many=True)
        return JsonResponse(users_serializer.data,safe=False)

@api_view(['POST',])
@csrf_exempt 
@permission_classes((IsAuthenticated,))
def user_form(request):
    if request.method =='POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT',])
def user_update(request):
    try:
        user = User.objects.get(pk=request.data.get('id'))
    except User.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
    if request.method =='PUT':
        user_serializer = UserSerializer(user,data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data, status=status.HTTP_202_ACCEPTED)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE',])
@csrf_exempt 
@permission_classes((IsAuthenticated,))
def user_delete(request,pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        if request.method =='DELETE':
            user.delete()
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)