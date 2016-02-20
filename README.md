國立臺灣大學學生會法規彙編
=======================
[![Build Status](https://travis-ci.org/ntu-student-congress/tortue.svg?branch=master)](https://travis-ci.org/ntu-student-congress/tortue)

這是一個將**國立臺灣大學學生會**法規彙編資料結構化的專案。<br>
專案代號為 **Tortue**，取自**法**文中烏**龜**的單字<br>
*更多說明待補充*

## 檔案格式
每一部法規位於 **laws** 目錄底下的一個 **.txt** 檔案<br>
封面、目錄等版面置於 **front.tex**<br>
版權頁、封底等版面置於 **back.tex**<br>
*檔案格式待補充*

## 技術說明
 - gen.js 須使用 Node.js 執行
 - CJK 字元支援使用 XeLaTex 達成
 - 產生 PDF 檔案需有 LaTeX 相關程式
 - 目前預設字體為 Noto Sans CJK TC，需有安裝相關字體方能使用

## 使用範例
使用以下命令將可以產生法規彙編之 **.pdf** 檔案

	node gen.js > law.tex # 將 gen.js 產生出的 LaTeX 標記導入到 law.tex 供後續使用
	xelatex law.tex

完成之結果可參考 **sample.pdf**

## 待完成事項
 - 法規 **.txt** 檔案格式說明
 - 目錄之格式調整
 - 法規順序之調整
 - 未完成結構化之法規補完
 - 分類 (基本法、綜合性、不同部門...)
 - 一法規終止於右頁時，次頁留白
 - 封底與版權頁之頁首頁尾移除
 - 其他版面方面調整
 - 解決要產生 PDF 兩次才會有目錄的問題
 - 掛上 Travis CI 自動產生 PDF

## 授權
待決定
