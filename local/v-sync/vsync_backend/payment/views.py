from django.shortcuts import render
from django.http import HttpResponse
from .ccavutil import encrypt,decrypt
from .ccavResponseHandler import res
from string import Template
from rest_framework.decorators import api_view
from rest_framework.response import Response
from room.models import Room
from room.views import checkAllDataRoom
from instant.views import checkAllDataInstant
from instant.models import InstantRoom
# Create your views here.


'''
Please put in the 32 bit alphanumeric key and Access Code in quotes provided by CCAvenues.
'''

accessCode = 'AVWH78KF22BF03HWFB' 	
workingKey = 'F0CD5C7785DB361C0A94D20F0171F559'

@api_view(['GET'])
def webprint(request):
    return render(request, 'dataFrom.html')



@api_view(['GET', 'POST'])
def ccavResponseHandler(request, room_id):
    try:
        if Room.objects.filter(room_id=room_id):
            room = Room.objects.get(room_id=room_id)
            typ = 'notInstant'
        elif InstantRoom.objects.filter(room_id=room_id):
            room = InstantRoom.objects.get(room_id=room_id)
            typ = 'instant'
        else:
            return Response({
                    'status': 400,
                    'message': 'Something went wrong',
                    'data': {'Error': 'Room not found'},
                })
        
        plainText,order_status = res(request.data['encResp'],typ,room_id)

        # save payment status in the database
        room.payment_status = order_status
        if order_status == 'Success':
            room.is_payment_done = True
        room.save()
        # return Response({
        #             'status': 200,
        #             'message': 'Payment status',
        #             'data': {'payment_status': order_status},
        #         }) 
        return HttpResponse(plainText)
    except Exception as e:
        print('erorr...',e)
        return Response({
            'status': 400,
            'message': 'Something went wrong',
            'data': {'Error': str(e)},
        })



@api_view(['GET','POST','GET'])
def login(request, room_id):
    try:
        # room_id = request.data['room_id']
        if Room.objects.filter(room_id=room_id) or InstantRoom.objects.filter(room_id=room_id):
            if Room.objects.filter(room_id=room_id):
                user_type, check, status = checkAllDataRoom(room_id, 'host')
                room = Room.objects.get(room_id=room_id)
                name = room.host.full_name
                print(name)
            else:
                check, status = checkAllDataInstant(room_id)
                room = InstantRoom.objects.get(room_id=room_id)
                name = room.host.full_name
                print(name)
            # not using checkpoint here
            if check == True or check == False:
                p_merchant_id = '2257694'
                p_order_id = room_id
                p_currency = 'INR'
                p_amount = "1"
                p_redirect_url = 'http://127.0.0.1:8000/api/payment/ccavResponseHandler/'+room_id+'/'
                p_cancel_url = 'http://127.0.0.1:8000/api/payment/ccavResponseHandler/'+room_id+'/'
                p_billing_name = name
                p_billing_country = "India"
                merchant_data='merchant_id='+p_merchant_id+'&'+'order_id='+p_order_id + '&' + "currency=" + p_currency + '&' + 'amount=' + p_amount+'&'+'redirect_url='+p_redirect_url+'&'+'cancel_url='+p_cancel_url+'&'+'billing_name='+p_billing_name+'&'+'billing_country='+p_billing_country
                encryption = encrypt(merchant_data,workingKey)
                html = '''\
                        <html>
                            <head>
                                <title>Sub-merchant checkout page</title>
                                <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
                            </head>
                            <body>
                                <form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction" > 
                                    <input type="hidden" id="encRequest" name="encRequest" value=$encReq>
                                    <input type="hidden" name="access_code" id="access_code" value=$xscode>
                                    <script language='javascript'>document.redirect.submit();</script>
                                </form>    
                            </body>
                        </html>
                    '''
                fin = Template(html).safe_substitute(encReq=encryption,xscode=accessCode)
                return HttpResponse(fin)
                # return Response({
                #     'status': 200,
                #     'message': 'User data',
                #     'data': {'encReq':encryption, 'xscode':accessCode},
                # })
            else:
                return Response({
                    'status': 400,
                    'message': 'Please fill all data!',
                    'data': status,
                })
        else:
            return Response({
                    'status': 400,
                    'message': 'Something went wrong',
                    'data': {'Error': 'Room not found'},
                })
    except Exception as e:
        print('erorr...',e)
        return Response({
            'status': 400,
            'message': 'Something went wrong',
            'data': {'Error': str(e)},
        })
    

