from django.contrib import admin
from .models import InstantRoom

class InstantRoomAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at',)  # Include the auto_now_add field in readonly_fields

admin.site.register(InstantRoom, InstantRoomAdmin)
