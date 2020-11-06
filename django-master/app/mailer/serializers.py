from rest_framework import serializers

from .models import Company,Contact

class CompanySerializer(serializers.ModelSerializer):
    order_count = serializers.SerializerMethodField('get_order_count')
    company_name = serializers.SerializerMethodField('get_company_name')
    order_sum  = serializers.SerializerMethodField('get_order_sum')
    details = serializers.SerializerMethodField('get_contact_details')

    class Meta:

        model = Company
        fields = ('company_name','order_count','order_sum','details')

    def get_order_count(self, obj):
        return obj.get_order_count()
    def get_company_name(self, obj):
        return obj.name
    def get_order_sum(self,obj):
        return obj.get_order_sum()
    def get_contact_details(self,obj):
        contact = Contact.objects.filter(company=obj.id)
        contact_serialized = ContactsSerializer(contact,many=True)
        return contact_serialized.data



class ContactsSerializer(serializers.ModelSerializer):
    order_count = serializers.SerializerMethodField()

    class Meta:
        model = Contact
        fields = ('id','first_name','last_name', 'email', 'company','order_count')

    def get_order_count(self, obj):
        return obj.orders.count()




