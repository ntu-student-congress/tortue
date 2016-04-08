國立臺灣大學學生會法規彙編
=======================
[![Build Status](https://travis-ci.org/ntu-student-congress/tortue.svg?branch=master)](https://travis-ci.org/ntu-student-congress/tortue)

這是一個將**國立臺灣大學學生會**法規彙編資料結構化的專案。<br>
專案代號為 **Tortue**，取自**法**文中烏**龜**的單字<br>
*更多說明待補充*

104-1 法規彙編[下載](https://goo.gl/VMq2Gs)。

## 檔案格式
每一部法規為 **laws** 目錄底下之 **分類** 目錄底下之一 **.txt** 檔案<br>
基本格式設定置於 **front.tex**<br>
封面、目錄等版面置於 **cover.tex**<br>
版權頁、封底等版面置於 **back.tex**<br>
*檔案格式待補充*

## 技術說明
 - gen.js 須使用 Node.js 執行
 - CJK 字元支援使用 XeLaTex 達成
 - 產生 PDF 檔案需有 LaTeX 相關程式
 - 目前使用字體為標楷體、宋體繁、Noto Sans CJK TC，需有安裝相關字體方能使用

## 使用範例
使用以下命令將可以產生法規彙編之 **.pdf** 檔案

	node gen.js # 個別產生 laws 中的所有資料，並儲存結果到 laws_tex
	node gen.js 1 # 產生全部法規，並儲存結果到 final.tex
	xelatex law.tex # 將 law.tex 產稱為 law.pdf

## 未來展望
 - 掛上 Travis CI 自動產生 PDF

## 授權
待決定
