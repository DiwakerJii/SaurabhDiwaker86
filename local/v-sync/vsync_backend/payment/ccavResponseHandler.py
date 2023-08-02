#!/usr/bin/python

from .ccavutil import encrypt,decrypt
from string import Template

def res(encResp, typ, room_id): 
	'''
	Please put in the 32 bit alphanumeric key in quotes provided by CCAvenues.
	'''
	workingKey = 'F0CD5C7785DB361C0A94D20F0171F559'
	decResp = decrypt(encResp,workingKey)
	
	# Find the index positions of 'order_status=' and '&'
	start_index = decResp.find("order_status=") + len("order_status=")
	end_index = decResp.find("&", start_index)

	# Extract the order_status value
	order_status = decResp[start_index:end_index]

	# data = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'	
	# data = data + decResp.replace('=','</td><td>')
	# data = data.replace('&','</td></tr><tr><td>')
	# data = data + '</td></tr></table>'
	
	html = '''\
	<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
			<title>Response Handler</title>
		</head>
		<body>
			<form name="redirect" action="http://127.0.0.1:3000/couple/$typ/paymentRedirect/$response/$room_id" name="redirect">
			<script language='javascript'>document.redirect.submit();</script>
			</form>
		</body>
	</html>
	'''


	fin = Template(html).safe_substitute(response=order_status,typ=typ,room_id=room_id)
	return fin, order_status
