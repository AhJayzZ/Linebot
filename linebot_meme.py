import time,os
import random
import requests
from bs4 import BeautifulSoup

res = requests.get('https://www.dcard.tw/search?query=%E5%A5%B6&forum=sex')
soup = BeautifulSoup(res.text,'html.parser')
div = soup.findAll('img',{'referrerpolicy':'no-referrer'})

for index in div:
    print(index['src'])


res = requests.get('https://www.google.com.tw/maps/search/%E5%85%A8%E8%81%AF/')
soup = BeautifulSoup(res.text,'html.parser')