#-*- coding: utf-8 -*-
from django.urls import include, path
from mailer.views import OrderApi

urlpatterns = [
    path('',OrderApi.as_view(),name="order")
]
