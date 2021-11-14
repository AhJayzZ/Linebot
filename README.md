# 抽卡機器人 Linebot

## 簡介 Introduction
如果無聊或想放鬆，這時候就可以打開Linebot機器人**抽點好笑的圖片或是影片放輕鬆**，主要應用Node.js和Line API進行開發並應用爬蟲(Web Scraping)技巧抓取網頁的圖片或影片的連結，最後部屬到Heroku平台常駐使用。

![](https://i.imgur.com/u3xbFFV.png)

----------------------------------------

## 環境設定 Environment
- 1.開發環境:**Node.js v14.17.0開發**
- 2.終端機執行 ```npm install``` 安裝會使用到的套件
- 3.使用工具:
    * 解析DOM元件:```dom-parser^0.1.6```
    * 建立框架:```express^4.17.1```
    * LineAPI:```linebot: "^1.6.1```
    * 請求網頁內容:```request^2.88.2```

----------------------------------------

## 指令 Command

| 指令 | 說明 |
| -------- | -------- | 
| **!抽**| 從[**梗圖產生器**](https://memes.tw/maker)隨機抽取一張圖片| 
| **!抽gif**|從[**梗圖gif產生器**](https://memes.tw/gif-maker)隨機抽取一張gif圖片 | 
|**!怒抽** | 從[**Dcard梗圖版**](https://www.dcard.tw/f/meme)隨機抽取一張圖片 **(Dcard加裝Cloudflare暫時無法使用該指令)**|
|**!福利** |從[**Dcard西斯版**](https://www.dcard.tw/f/sex)隨機抽取一張圖片 **(Dcard加裝Cloudflare暫時無法使用該指令)** |
|**!確診人數**|從[**CDC疾病管制署**](https://sites.google.com/cdc.gov.tw/2019ncov/taiwan?authuser=0)回傳確診人數資訊 |
|**!看短片** |從[**ifunny**](https://ifunny.co/memes)隨機抽取一部影片|

----------------------------------------

## 成果 Result

- ### 抽圖片
    ![](https://i.imgur.com/XAfMJYZ.jpg)
    
- ### 抽gif
    ![](https://i.imgur.com/mHcxPAe.jpg)

- ### 抽影片
    ![](https://i.imgur.com/4sae3Ev.jpg)

- ### 確診人數
    ![](https://i.imgur.com/5otfKt0.png)
