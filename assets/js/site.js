// コードブロックにコピーボタンを付ける。JavaScript が無くても読める。

document.querySelectorAll("pre > code").forEach((code) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-button";
  button.textContent = "コピー";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.innerText.trimEnd());
      button.textContent = "コピーしました";
    } catch {
      button.textContent = "コピーできませんでした";
    }
    setTimeout(() => { button.textContent = "コピー"; }, 1600);
  });
  code.parentElement.appendChild(button);
});
