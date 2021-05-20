import time,os
import random
import requests
from bs4 import BeautifulSoup



res = requests.get('https://ifunny.co/video/Xt1QZ0va8?gallery=tag&query=mp4')
soup = BeautifulSoup(res.text,'html.parser')
print(soup)