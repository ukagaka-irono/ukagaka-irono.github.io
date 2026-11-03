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
uemoto_and_rahuu/          ゴースト「植本とラフウ」の配布ページ（index.html）と nar
uemoto_and_rahuu/update/   植本とラフウのネットワーク更新ファイル（ゴーストの descript.txt の homeurl）
maid_classic/              バルーン「Maid Classic」の配布ページ（index.html）と nar
maid_classic/update/       Maid Classic のネットワーク更新ファイル（バルーンの descript.txt の homeurl）
tama-v6/                   tama v6 の配布ページ（index.html）と、リリースの tama.exe / tama_NUPX.exe / tamac.exe
```

植本とラフウの nar と `uemoto_and_rahuu/update/` は、ゴーストのリポジトリ（非公開）の
`tools/publish-pages.ps1` で入れかえます。手で直さないでください。版を出したら、
`uemoto_and_rahuu/index.html` とトップの版の数字を直します。

Maid Classic の nar と `maid_classic/update/` も同じく、バルーンのリポジトリ（非公開）の
`tools/publish-pages.ps1` で入れかえます。版を出したら `maid_classic/index.html` の日付を直します。

Engawa の新しい版が出たら、`engawa/app/index.html` を入れかえて、`engawa/index.html` と
トップの版の数字を直します。

```bash
gh release download <タグ> -R ukagaka-irono/Engawa -p index.html -D engawa/app --clobber
```

tama v6 の新しい版が出たら、`tama-v6/` の exe を入れかえて、`tama-v6/index.html` の版・日付・
ファイルの大きさ・更新履歴と、トップの版の数字を直します。

```bash
gh release download <タグ> -R ukagaka-irono/tama-v6 -p tama.exe -p tama_NUPX.exe -p tamac.exe -D tama-v6 --clobber
```

ページを足すときは、いまあるリポジトリのページをコピーして、見出しと本文を書きかえます。
トップの `index.html` にもカードを 1 枚足してください。

## 手元で見る

```bash
python -m http.server 8765
```

http://localhost:8765/ を開きます。
