# Generated by Django 5.0.3 on 2024-03-09 08:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_order_orderitem_review_shippingaddress'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='shippingaddress',
            options={'verbose_name_plural': 'Shipping addresses'},
        ),
    ]