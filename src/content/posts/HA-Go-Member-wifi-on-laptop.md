---
title: 【祕技】如何在所有裝置上使用HA Go Member WiFi
published: 2026-01-14
description: 如何在所有裝置上使用HA Go Member WiFi.
tags: [醫院, WiFi, Tech]
category: Tech
draft: false
---

[HA Go Member WiFi](https://www2.ha.org.hk/hago/en/features/useful-information/ha-go-wi-fi) 為香港醫院管理局為公立醫院提供的免費 WiFi，會員可以在登入後免費享用不限時的 WiFi，連線品質和安全性都比免登入的限時限次數的 Guest WiFi 好很多。  
唯只限於已安裝 [HA Go 應用程式](https://www2.ha.org.hk/hago/about-ha-go/ha-go/what-is-ha-go) 的流動裝置使用，iPad 和手提電腦不能安裝 HA Go，所以原則上不能使用。本教學旨在提供一個讓其他裝置也能使用此 WiFi 的辦法。

### 前置要求
- 已註冊成為 HA Go 正式會員
- 一部已登入 HA Go 應用程式的 iOS 流動裝置

### 步驟
#### 1. 在已登入 HA Go 應用程式的流動裝置上嘗試啟動 WiFi
HA Go 會在瀏覽器中下載名為 `hago_wifi_config.mobileconfig` 的 WiFi 設定檔。  
你可以在 Downloads 資料夾中找到它。

#### 2. 將 WiFi 設定檔傳送到手提電腦上
![Screenshot - Wifi Config Downloaded On Macbook](../../assets/images/HA-Go-Member-wifi-on-laptop/Screenshot-WifiConfigOnMacbook.png)

#### 3. 在手提電腦上安裝設定檔
MacBook 可以直接安裝。詳見其他安裝設定檔教程。

如果使用 Windows，可以嘗試強行使用 Text Editor 開啟檔案。  
從中找到 WiFi 的 1. SSID， 2. Security Type， 3. Password，再以此登入網絡。

### 風險提示
WiFi 設定檔可能含有敏感個人資料，外洩可能會導致嚴重後果。  
以此方法登入 WiFi 有可能違反 HA Go Member WiFi 使用條款。  
本文只供教學用途，筆者並不鼓勵任何有可能違反 HA Go Member WiFi 使用條款的行為。