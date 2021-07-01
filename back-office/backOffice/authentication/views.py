from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .serializers import RegistrationSerializer

# Create your views here.


@api_view(['POST', ])
@permission_classes(())
def register(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['email']=account.email
            token = Token.objects.get(user=account).key
            data['token'] = token
        else :
            data = serializer.errors

        return Response(data)
