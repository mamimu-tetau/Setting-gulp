## Macの開発環境セットアップ
***
1. エディタのインストール(Brackets、SublimeText、Atom、DWなどなど)
2. [Macのプリインストールapacheの設定(静的サイト作成用)](https://github.com/mamimu-tetau/Setting-mac-apache)
3. [sshの設定(サーバ接続、Gitリモート接続用)](https://github.com/mamimu-tetau/Setting-ssh)
4. [nodeのインストール(Gulp用)](https://github.com/mamimu-tetau/Setting-Install-node)
5. [Gulpのインストール](https://github.com/mamimu-tetau/Setting-gulp)
6. [Sorcetreeのインストールと設定](https://github.com/mamimu-tetau/Setting-Sorcetree)
***
<br><br><br>

# 5. Gulpのインストール

- [Gulpをグローバルにインストール(初回のみの作業)](#gulpをグローバルにインストール初回のみの作業)
- [Gulpをプロジェクトごとにインストール(プロジェクトごとに必要)](#gulpをプロジェクトごとにインストールプロジェクトごとに必要)
- [Gulpのローカルインストール](#gulpのローカルインストール)
- [Gulpプラグインをインストール](#gulpプラグインをインストール)
- [実際に動かす準備](#実際に動かす準備)
- [動かしてみましょう。](#動かしてみましょう。)
- [TroubleShoot](#troubleShoot)
<br><br><br>


### Gulpをグローバルにインストール(初回のみの作業)
***
#### npmのバージョンを最新にしておく
```
$ npm install -g npm
```
#### Gulpをグローバルにインストール
```
$ npm i -g gulp
```
#### 確認
```
$ gulp -v
```
`CLI version: 2.2.0`とかが出ればOK
<br><br><br>


### Gulpをプロジェクトごとにインストール(プロジェクトごとに必要)
***
#### npmのバージョンを最新にしておく
できる限りこちは時間がある時に最新版にアップデートしておいてください。
```
$ npm install -g npm
```
<br><br>
今回はこのリポジトリにサンプルを用意したいのでgit cloneかzipとかでダウンロードしてください。
<br><br>
#### 静的サイトのディレクトリ構成はこんな感じ
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
  │ 
  ├── gulpfile.js
  ├── package.json
```

#### Wordpressのディレクトリ構成はこんな感じ
```
themes
  ├── テーマ名
      ├── node_modules
      ├── gulpfile.js
      ├── package.json
      │
      ├── scss/*.scss
      ├── *.php
      └── assets
          ├── css
          ├── images
          ├── js
```

#### プロジェクトフォルダに移動
ターミナルを立ち上げて上記でダウンロードしたディレクトリに移動します。
```
$ cd C:\hoge\fuga\piyo\project
```
ターミナルにそのフォルダをドロップするとパス勝手に入ります。便利

#### package.jsonの作成
インストールしたパッケージとか一覧で見れるから作っておいた方が便利ですが簡単なプロジェクトならスルーでOK。
プロジェクト名やらなんやら設定が出てくるから必要なら設定
```
$ npm init
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



### Gulpのローカルインストール
***
```
$ npm install gulp -D
```
<br><br><br>


### Gulpプラグインをインストール
***
#### Sassコンパイル + browser-sync
```
$ npm install gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-filter gulp-notify gulp-plumber browser-sync -D
```  

* gulp-sass Sassのコンパイル
* gulp-autoprefixer PostCSSのベンダープレフィクス自動化　だれかPostCSSでの書き方教えて
* gulp-sourcemaps　CSSのソースマップ作成　他にもいいのあればアップデートしたい
* gulp-filter　ストリームの中身をグロブパターンによって抽出したファイルだけに
* gulp-notify　デスクトップ通知
* gulp-plumber エラーが発生しても落ちないように  
* browser-sync ファイル変更を監視し、自動でブラウザリロードを行ってくれる  
<br><br>

#### + Minify系(sassのコンパイルだけが目的ならこちらはスルーでOK)
```
$ npm install -D gulp-cssmin gulp-imagemin imagemin-mozjpeg gulp-uglify imagemin-pngquant
```  

* gulp-cssmin CSS Minify
* gulp-imagemin 画像圧縮
* imagemin-mozjpeg jpg圧縮（要検討）
* imagemin-pngquant png圧縮（要検討）
* gulp-uglify js圧縮（要検討） 
<br><br><br>



### 実際に動かす準備
***
macのapacheの設定がまだなら↓を行ってください。<br />
[Macのプリインストールapacheの設定(静的サイト作成用)](https://github.com/mamimu-tetau/Setting-mac-apache)
<br><br>

#### httpd-vhost.confに追記
Finderから`Command + Shift +G`で移動先に`~/.ssh`<br />
viでやっちゃうよ！って方はご自由に。<br />

ファイルの場所
```
/private/etc/apache2/extra/httpd-vhosts.conf
```

httpd-vhost.conf
```
<VirtualHost *:80>
    serverName localhost.使用するローカル用ドメイン名
    #作業フォルダ
    DocumentRoot "/Users/あんたのユーザー名/ダウンロードしたフォルダ/project/src"
    <Directory "/Users/あんたのユーザー名/ダウンロードしたフォルダ/project/src">
        Require all granted
    </Directory>
</VirtualHost>
```
使用するローカル用ドメイン名は`localhost.+本番ドメイン`など決めておいたほうがいいかも。<br />
これでhttpd-vhost.confの設定終わり。保存して閉じます。<br />
閉じる時にパスワード聞かれるかも。それでも保存できない場合は権限を追加するなりエディタ変えるなり。
<br /><br />

#### hosts編集
上記のバーチャルホストで設定したローカル用ドメイン名を有効にします。
hostsファイルは慎重に取り扱ってください。間違うとmac壊れるかもしれませんw
```
$ sudo vi /private/etc/hosts
```
`sudo`なしで動くならなしで。

hosts
``` 
127.0.0.1 localhost.mamimu.div
``` 
最後の行とかに追記。
<br><br><br>



### 動かしてみましょう。
***
#### プロジェクトフォルダに移動
ターミナルを立ち上げて上記でダウンロードしたディレクトリに移動します。
```
$ cd /Users/あんたのユーザー名/ダウンロードしたフォルダ/project/
```
で
```
$ gulp
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

### Gulpバージョン変更
***
#### グローバル
```
npm uninstall -g gulp
npm install -g gulp
```
<br><br>
#### ローカル
```
npm uninstall -D gulp
npm install -D gulp
```
<br><br><br>


# TroubleShoot

### BrowserSync
***
```
はまりどころbodyタグ抜けてるとダメす
```
<br><br>

### BrowserSyncでerror系
***
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
`他でgulp起動してんじゃない？`<br>
または<br>
`gulpfile.jsのポートを変えてみる`
```
gulp.task('browser-sync', function () {
    browserSync({
        notify: false,
        port: 3010,
        proxy: "http://localhost.senzanan.com"
    });
});
```
<br><br><br>

### throw new Error
***
```
throw new Error(errors.missingBinary());
なんやかんやエラー
```
`たぶん各パッケージとnodeのバージョンとかが合っていない`<br>
もうこの際npm initから再度Gulpインストールしたほうがいいかも。<br>
該当ディレクトリの<br>
package.json<br>
package-lock.json<br>
node_modules<br>
を削除。

んで[### Gulpのローカルインストール](#gulpのローカルインストール)



<br><br>


