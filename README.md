## gulpを利用するためのステップ
* node.jsのインストール（初回のみ）
* gulpをグローバルインストール（初回のみ）
* gulpを各プロジェクトにインストール  

## node.jsのインストール（初回のみ）
公式サイトからインストーラーをダウンロード
https://nodejs.org/en/
バージョン管理とかする場合はゴニョゴニョしてください。
node.jsをインストールをするとnpmコマンドが使えるようになります。

```
node -v
v8.7.0 #バージョン出ればOK
```

##### npmのバージョンを最新にしておく

```
npm -v
sudo npm install -g npm
```

(sudo については環境で読み替えてください)  


## gulpをグローバルにインストール（初回のみ）

```
sudo npm install -g gulp
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
