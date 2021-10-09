import requests
import json


for i in range(10) :
    data = requests.get('https://www.proxyscan.io/api/proxy?type=http').text
    json_data = json.loads(data)
    print(json_data[0]['Ip'])
