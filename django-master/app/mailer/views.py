#-*- coding: utf-8 -*-
from rest_framework import generics,response
from .serializers import CompanySerializer
from rest_framework import pagination
from mailer.models import Company,Order,Contact


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 20
    page_query_param = 'page'

    def get_paginated_response(self, data):
        count_per_page = self.page.paginator.count//len(data) + 1 if self.page.paginator.count%len(data)!=0 else self.page.paginator.count//len(data)
        return response.Response({
            'total': count_per_page,
            'data': data
    })

class OrderApi(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    pagination_class =  StandardResultsSetPagination
