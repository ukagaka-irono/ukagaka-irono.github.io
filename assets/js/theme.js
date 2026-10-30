// ライト／ダークの切りかえ。<head> で読み、描画の前に <html data-theme> を決める。
// 自分で選ぶまでは OS の設定に合わせ、選んだらブラウザに覚えておく。

(() => {
  const KEY = "theme";
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch { /* 覚えられなくても、切りかえはできる */ }

  const current = () => saved || (system.matches ? "dark" : "light");
  const apply = () => { root.dataset.theme = current(); };
  apply();
  system.addEventListener("change", () => { if (!saved) { apply(); label(); } });

  let button = null;
  const label = () => {
    if (!button) return;
    const dark = current() === "dark";
    button.textContent = dark ? "ライトにする" : "ダークにする";
  };

  document.addEventListener("DOMContentLoaded", () => {
    const place = document.querySelector(".site-nav") || document.querySelector(".site-header .container");
    if (!place) return;
    button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.addEventListener("click", () => {
      saved = current() === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, saved); } catch { /* このページの間だけ切りかわる */ }
      apply();
      label();
    });
    label();
    place.appendChild(button);
  });
})();
