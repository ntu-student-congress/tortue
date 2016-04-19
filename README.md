國立臺灣大學學生會法規彙編
=======================
[![Build Status](https://travis-ci.org/ntu-student-congress/tortue.svg?branch=master)](https://travis-ci.org/ntu-student-congress/tortue)

這是一個將**國立臺灣大學學生會**法規彙編資料結構化的專案。<br>
專案代號為 **Tortue**，取自**法**文中烏**龜**的單字。<br>

104-1 法規彙編[連結](https://goo.gl/VMq2Gs)

## 檔案格式

### 目錄架構
 - 基本格式設定置於 **front.tex**<br>
 - 封面、目錄等版面置於 **cover.tex**<br>
 - 版權頁、封底等版面置於 **back.tex**<br>
 - 每一部法規為 **laws** 目錄底下之 **分類** 目錄底下之一 **.txt** 檔案

### 法規檔案格式
 - UTF-8 編碼之純文字檔案
 - 內文第一行為法規名稱
 - 修訂紀錄每筆一行，與法規名稱之間空一行
 - 正文部分與修訂紀錄之間空一行
 - **章** 以 `第Ｏ章 ＯＯＯ` 表示
 - **條** 以 `第Ｏ條　【ＯＯＯ】` 表示，行首有二個半形空白 ` `
 - **項** 以 `ＯＯＯ` 表示，行首有四個半形空白 ` `
 - **款** 以 `Ｏ、ＯＯＯ` 表示，行首有六個半形空白 ` `
 - 每增加一層級，行首比上一層級多兩個半形空白 ` `，以此類推
 - 須以宋體繁標示者(例如未施行法條)，開始前以獨立一行標示 `<SongTi>`，結束後以獨立一行 `</SongTi>` 標示

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

若無法使用 git，下載本專案可用網頁右上角之 **Download ZIP** 按鈕進行

## 未來展望
 - 掛上 Travis CI 自動產生 PDF

## 授權
待決定
