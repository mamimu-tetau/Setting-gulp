## gulpを利用するためのステップ
* node.jsのインストール（初回のみ）
* gulpをグローバルインストール（初回のみ）
* gulpを各プロジェクトにインストール  
<br><br><br>


## 将来的にvccwやその他の開発系フレームワークとか使うならhomebrewとnodebrewでnode.jsのインストールを強くお勧めします。
[nodeのインストール](https://github.com/mamimu-tetau/vccw)
こちらでnodeのインストールまでを済ませてください。
<br><br><br>


## gulpをグローバルにインストール（初回のみ）
すべてターミナルでの作業です。

```
npm install -g gulp
```  
<br><br><br>



# 　ここからはプロジェクトごとに行う作業
<br><br><br>

## npmのバージョンを最新にしておく
できる限りこちは時間がある時に最新版にアップデートしておいてください。
```
npm install -g npm
```
<br><br><br>


今回はこのリポジトリにサンプルを用意したいのでgit cloneかzipとかでダウンロードしてください。
<br><br>
## 静的サイトのディレクトリ構成はこんな感じ
```
project
  ├── node_modules
  ├── public_html（納品用）
  ├── src（開発用）
  │   ├── scss/*.scss
  │   ├── **/*.html
  │   └── assets
  │       ├── css
  │       ├── images
  │       ├── js
  │       ├── scss
  ├── gulpfile.js
  ├── package.json
```
<br><br><br>


## プロジェクトフォルダに移動
ターミナルを立ち上げて上記でダウンロードしたディレクトリに移動します。
```
cd C:\hoge\fuga\piyo\project
```
ターミナルにそのフォルダをドロップするとパス勝手に入ります。便利
<br><br><br>


## package.jsonの作成
インストールしたパッケージとか一覧で見れるから作っておいた方が便利ですが簡単なプロジェクトならスルーでOK。
プロジェクト名やらなんやら設定が出てくるから必要なら設定
```
npm init
```
プロジェクト名やらなんやら設定が出てくるから必要なら設定。
enterで進んでいく。で最後にyes
```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (desktop) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/hacca/Desktop/package.json:

{
  "name": "desktop",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) 
```
こんな感じの出る。
<br><br><br>



## gulpのローカルインストール

```
npm install gulp@next -D
```
nodeのアップデートやその他のプラグインのこともあり、Gulpをv4にアップしました。
CLIは多分3.9のまま？CLIを4に上げる方法教えて。
<br><br><br>


## gulpプラグインをインストール

##### Sassコンパイル + browser-sync
```
npm install -D gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-filter gulp-notify gulp-plumber browser-sync
```  

* gulp-sass Sassのコンパイル
* gulp-autoprefixer PostCSSのベンダープレフィクス自動化　だれかPostCSSでの書き方教えて
* gulp-sourcemaps　CSSのソースマップ作成　他にもいいのあればアップデートしたい
* gulp-filter　ストリームの中身をグロブパターンによって抽出したファイルだけに
* gulp-notify　デスクトップ通知
* gulp-plumber エラーが発生しても落ちないように  
* browser-sync ファイル変更を監視し、自動でブラウザリロードを行ってくれる  
<br><br><br>

##### + Minify
sassのコンパイルだけが目的ならこちらはスルーでOK

```
npm install -D gulp-cssmin gulp-imagemin imagemin-mozjpeg gulp-uglify imagemin-pngquant
```  

* gulp-cssmin CSS Minify
* gulp-imagemin 画像圧縮
* imagemin-mozjpeg jpg圧縮（要検討）
* imagemin-pngquant png圧縮（要検討）
* gulp-uglify js圧縮（要検討） 
<br><br><br>


# 実際に動かしてみましょう。

macのapacheの設定がまだなら↓を行ってください。
[macのapacheとかもろもrも](https://github.com/mamimu-tetau/mac-apache)
<br><br>
で上記URLのバーチャルホストを記入するところで今回のやつを追記
```
<VirtualHost *:80>
    serverName localhost.mamimu.div
    #作業フォルダ
    DocumentRoot "/Users/あんたのユーザー名/ダウンロードしたフォルダ/project/src"
	<Directory "/Users/あんたのユーザー名/ダウンロードしたフォルダ/project/src">
		Require all granted
	</Directory>
</VirtualHost>

```  
さらにhostsファイルにこちらも追記
``` 
127.0.0.1 localhost.mamimu.div
``` 
準備完了！

## こんどこそ動かしてみましょう。

#### プロジェクトフォルダに移動
ターミナルを立ち上げて上記でダウンロードしたディレクトリに移動します。
```
cd /Users/あんたのユーザー名/ダウンロードしたフォルダ/project/
```
で
```
npx gulp
```
```
[23:05:22] Using gulpfile ~/localhost/mamimu.div/gulpfile.js
[23:05:22] Starting 'browser-sync'...
[23:05:22] Finished 'browser-sync' after 106 ms
[23:05:22] Starting 'default'...
[23:05:24] Finished 'default' after 1.68 s
[Browsersync] Proxying: http://localhost.mamimu.div
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://10.252.29.236:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://10.252.29.236:3001
 --------------------------------------
```
こんなのがでてブラウザがlocalhost:3000で立ち上がり表示されるとOK。  
scssファイルを保存すると
```
[23:06:18] Starting 'sass'...
[23:06:18] Finished 'sass' after 15 ms
[Browsersync] 2 files changed (default.css, style.css)
```
こんな感じでブラウザが更新される。はず  
で終了する時は
```contorl + c```キーで終わります。
<br><br><br>



# 余談

## Gulpバージョン変更
##### グローバル
```
npm uninstall -g gulp
npm install -g gulp
```
<br><br><br>

#### ローカル
```
npm uninstall -D gulp
npm install -D gulp
```
<br><br><br>

#### gulp 4 をインストールしたい！
他の案件は gulp3 でやっちゃってるんだけどという他のプロジェクトとバッティングしないかという問題。

```
npm install -D gulp
これでは3X系がインストールされる。なので

ローカルのプロジェクトフォルダまでいって
npm install gulp@next -D
```
でもこれでは動かない。
npmのバージョン5.2.0で導入されたnpxを使うらしい。
```
npx gulp

```
あとはgulpfile.jsの問題
<br><br><br>

# TroubleShoot

## BrowserSync
はまりどころbodyタグ抜けてるとダメす
<br><br><br>



## BrowserSyncでerror系
Chrome68にアップしたらポート使ってるよみたいなエラーがでたよ。


```
events.js:183
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::3000
    at Object._errnoException (util.js:992:11)
    at _exceptionWithHostPort (util.js:1014:20)
    at Server.setupListenHandle [as _listen2] (net.js:1355:14)
    at listenInCluster (net.js:1396:12)
    at Server.listen (net.js:1480:7)
```

他でgulp起動してんじゃない？



gulpfile.jsのポートを変えてみる
```
gulp.task('browser-sync', function () {
	browserSync({
		notify: false,
		port: 3010,
		proxy: "http://localhost.senzanan.com"
	});
});
```



