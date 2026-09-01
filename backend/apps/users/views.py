from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
# rest_framework permission
from rest_framework.permissions import IsAuthenticated
# Create your views here.

@api_view(["GET"])
def login_endpoint (request):
    return Response ({
        "Response" : "API Is Working!"
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def protected_test(request):
    return Response ({
        "Response" : "This is Protected API",
        "user" : request.user.username
    })