// サイト全体の小さな動き。JavaScript が無くても、読む・たどる・コピーするはできる。
//
// 1. コードブロックのコピーボタン
// 2. 全画面メニュー（右上から波紋のように開く）
// 3. 下へスクロールすると引っ込むヘッダー
// 4. ヒーローの光（カーソルの位置をたどる）

(() => {
  // ---------- 1. コピーボタン ----------

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

  // ---------- 2. 全画面メニュー ----------

  const header = document.querySelector(".site-header");
  const menuHost = header && header.querySelector(".container");
  if (!menuHost) return;

  const items = [];
  const seen = new Set();
  const add = (href, label) => {
    if (!href || !label || seen.has(href)) return;
    seen.add(href);
    items.push({ href, label });
  };

  const tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length) {
    tocLinks.forEach((a) => add(a.getAttribute("href"), a.textContent.trim()));
  } else {
    document.querySelectorAll("main h2[id]").forEach((h2) => {
      add(`#${h2.id}`, h2.textContent.replace(/^\s*0\d\s*/, "").trim());
    });
  }
  document.querySelectorAll(".site-nav a").forEach((a) => {
    add(a.getAttribute("href"), a.textContent.trim());
  });

  if (items.length < 2) return;

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "menu-trigger";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", "pulse-menu");
  trigger.innerHTML = '<span class="menu-trigger-lines" aria-hidden="true"></span><span>Menu</span>';
  menuHost.appendChild(trigger);

  const menu = document.createElement("div");
  menu.className = "pulse-menu";
  menu.id = "pulse-menu";
  menu.hidden = true;
  menu.setAttribute("role", "dialog");
  menu.setAttribute("aria-modal", "true");
  menu.setAttribute("aria-label", "メニュー");

  const close = document.createElement("button");
  close.type = "button";
  close.className = "pulse-menu-close";
  close.innerHTML = "<span>Close</span><span aria-hidden=\"true\">×</span>";
  menu.appendChild(close);

  const kicker = document.createElement("p");
  kicker.className = "pulse-menu-kicker";
  kicker.textContent = "ukagaka-irono / Index";
  menu.appendChild(kicker);

  const list = document.createElement("ul");
  list.className = "pulse-menu-list";
  items.slice(0, 16).forEach((item, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    const num = document.createElement("span");
    num.className = "pulse-menu-num";
    num.textContent = String(index + 1).padStart(2, "0");
    const label = document.createElement("span");
    label.textContent = item.label;
    a.append(num, label);
    li.appendChild(a);
    list.appendChild(li);
  });
  menu.appendChild(list);
  document.body.appendChild(menu);

  let menuOpen = false;
  let lastFocus = null;

  const openMenu = () => {
    if (menuOpen) return;
    menuOpen = true;
    lastFocus = document.activeElement;
    menu.hidden = false;
    document.body.classList.add("menu-open");
    trigger.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => menu.classList.add("is-open"));
    close.focus({ preventScroll: true });
  };

  const closeMenu = (returnFocus = true) => {
    if (!menuOpen) return;
    menuOpen = false;
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    trigger.setAttribute("aria-expanded", "false");
    const done = () => {
      menu.hidden = true;
      if (returnFocus && lastFocus) lastFocus.focus({ preventScroll: true });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) done();
    else setTimeout(done, 700);
  };

  trigger.addEventListener("click", openMenu);
  close.addEventListener("click", () => closeMenu());
  menu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) closeMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (!menuOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;
    const focusables = menu.querySelectorAll("a[href], button");
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // ---------- 3. ヘッダーの引っ込み ----------

  let lastY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (!menuOpen) {
        header.classList.toggle("is-hidden", y > lastY && y > 280);
      }
      lastY = y;
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- 4. ヒーローの光 ----------

  const hero = document.querySelector(".hero");
  if (hero && window.matchMedia("(hover: hover)").matches) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  }
})();
