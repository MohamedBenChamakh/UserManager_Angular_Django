from rest_framework import serializers 
from .models import Account




class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['email','username','password']
        extra_kwargs ={
            'password':{'write_only':True}
        }



    def save(self):
        account = Account(
                email=self.validated_data['email'],
                username=self.validated_data['username'],
        )
        account.set_password(self.validated_data['password'])
        account.save()
        return account