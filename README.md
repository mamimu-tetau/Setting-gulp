## gulpを利用するためのステップ
* node.jsのインストール（初回のみ）
* gulpをグローバルインストール（初回のみ）
* gulpを各プロジェクトにインストール  
<br><br><br>


## node.jsのインストール（初回のみ）
公式サイトからインストーラーをダウンロード
https://nodejs.org/en/
バージョン管理とかする場合はゴニョゴニョしてください。
node.jsをインストールをするとnpmコマンドが使えるようになります。
```
node -v
v8.7.0 #バージョン出ればOK
```
<br><br><br>



##### npmのバージョンを最新にしておく

```
npm -v
npm install -g npm
```

(sudo については環境で読み替えてください)  


## gulpをグローバルにインストール（初回のみ）

```
npm install -g gulp
```  

## 各プロジェクトにインストール
ここからはプロジェクトごとに行う作業

プロジェクトフォルダに移動

```
cd C:\hoge\fuga\piyo\ProjectDirectory
```

##### package.jsonの作成

```
npm init
```

##### gulpのローカルインストール

```
npm install gulp --save-dev
npm install gulp@3.9.1 --save-dev （バージョン洗濯する場合）
```
できる限りバージョンはCLIと合わせる。

##### --saveと--save-dev
違いはようわからんすのでgoogleさんに聞いて。  
で、なんで付けるかというとnpm install で --save をつけると、 package.json にインストールしたパッケージ名とそのバージョンが自動的に保存され、他で同じ環境を作ることが出来る。


参考
https://www.webprofessional.jp/introduction-gulp-js/


## Gulpプラグインをインストール

##### Sassコンパイル + browser-sync
```
npm install gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-filter gulp-notify gulp-plumber browser-sync --save-dev
```  

* gulp-sass Sassのコンパイル
* gulp-autoprefixer PostCSSのベンダープレフィクス自動化　だれかPostCSSでの書き方教えて
* gulp-sourcemaps　CSSのソースマップ作成　他にもいいのあればアップデートしたい
* gulp-filter　ストリームの中身をグロブパターンによって抽出したファイルだけに
* gulp-notify　デスクトップ通知
* gulp-plumber エラーが発生しても落ちないように  
* browser-sync ファイル変更を監視し、自動でブラウザリロードを行ってくれる  


##### + Minify
```
npm install gulp-cssmin gulp-imagemin imagemin-mozjpeg gulp-uglify imagemin-pngquant --save-dev
```  

* gulp-cssmin CSS Minify
* gulp-imagemin 画像圧縮
* imagemin-mozjpeg jpg圧縮（要検討）
* imagemin-pngquant png圧縮（要検討）
* gulp-uglify js圧縮（要検討） 
 


## 静的サイトのディレクトリ構成
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

## Gulpバージョン変更
##### グローバル
```
npm uninstall -g gulp
npm install -g gulp
```

##### ローカル
```
npm uninstall gulp --save-dev
npm install gulp --save-dev
```

## BrowserSync
はまりどころbodyタグ抜けてるとダメす
