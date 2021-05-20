import time,os
import random
import requests
from bs4 import BeautifulSoup



res = requests.get('https://www.dcard.tw/service/api/v2/forums/meme/posts?&limit=100')
soup = BeautifulSoup(res.text,'html.parser')
print(soup)