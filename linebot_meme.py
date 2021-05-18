import time,os
import random
import requests
from bs4 import BeautifulSoup



home_url = 'https://memes.tw/wtf?page='
random_num =  int((random.random()) * 500)
meme_url = home_url + str(random_num);

res = requests.get(meme_url).text
soup = BeautifulSoup(res,'html.parser')
div = soup.find_all('div',{'class':'mt-3'})
print(div)
classname = soup.find_all('img',{'class':'img-fluid lazy loaded'})
print (classname)