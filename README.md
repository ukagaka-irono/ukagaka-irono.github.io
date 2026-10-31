# ukagaka-irono.github.io

ukagaka-irono のリポジトリの使い方とやり方をまとめたサイト（GitHub Pages）です。

https://ukagaka-irono.github.io/

## 構成

ビルドの要らない、ふつうの HTML です。

```
index.html                 トップ（リポジトリの一覧）
<リポジトリ名>/index.html   各リポジトリの使い方
assets/css/style.css       全ページ共通のスタイル（色・余白は :root のトークンで決める）
assets/js/site.js          コードのコピーボタン
assets/js/theme.js         ライト／ダークの切りかえ（<head> で読む）
.nojekyll                  Jekyll を通さずそのまま公開する
engawa/app/index.html      Engawa のリリースの index.html をそのまま置いたもの（このサイトで動かす版）
```

Engawa の新しい版が出たら、`engawa/app/index.html` を入れかえて、`engawa/index.html` と
トップの版の数字を直します。

```bash
gh release download <タグ> -R ukagaka-irono/Engawa -p index.html -D engawa/app --clobber
```

ページを足すときは、いまあるリポジトリのページをコピーして、見出しと本文を書きかえます。
トップの `index.html` にもカードを 1 枚足してください。

## 手元で見る

```bash
python -m http.server 8765
```

http://localhost:8765/ を開きます。
