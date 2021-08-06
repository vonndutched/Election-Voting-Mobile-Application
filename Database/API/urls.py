from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import MemberViewSet, VoteViewSet, PositionViewSet

router = routers.DefaultRouter()
router.register('members', MemberViewSet)
router.register('votes', VoteViewSet)
router.register('positions', PositionViewSet)


urlpatterns = [
    path('', include(router.urls)),

]