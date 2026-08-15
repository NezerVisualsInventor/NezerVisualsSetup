(function () {
  'use strict';

  const CONFIG = window.APP_CONFIG || {};
  const hasDownload = typeof CONFIG.downloadUrl === 'string' && CONFIG.downloadUrl.trim() !== '';

  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 3500);
  }

  function fillInfo() {
    const setText = function (id, value) {
      const el = document.getElementById(id);
      if (el && value) el.textContent = value;
    };
    setText('app-version', CONFIG.version);
    setText('cta-version', CONFIG.version);
    setText('app-size', CONFIG.size);
    setText('cta-size', CONFIG.size);

    if (CONFIG.githubUrl) {
      document.querySelectorAll('a[href="https://github.com/GamesLoxotron/NezerVisuals"]').forEach(function (a) {
        a.href = CONFIG.githubUrl;
      });
    }
  }

  function handleDownloadClick(event) {
    if (hasDownload) return;
    event.preventDefault();
    showToast('Ссылка на скачивание скоро появится');
  }

  let lastTgSent = 0;

  function sendTelegramNotification() {
    const tg = CONFIG.telegram || {};
    if (!tg.enabled || !tg.botToken || !tg.chatId) return;

    const now = Date.now();
    if (now - lastTgSent < 20000) return;
    lastTgSent = now;

    const lines = [
      '⬇️ Новое скачивание Nezer Visuals Launcher',
      '',
      '🕒 ' + new Date().toLocaleString('ru-RU'),
      '🌐 ' + window.location.href,
    ];
    const text = lines.join('\n');

    try {
      if (tg.proxyUrl) {
        fetch(tg.proxyUrl, {
          method: 'POST',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bot_token: tg.botToken, chat_id: tg.chatId, text: text }),
        }).catch(function () {});
      } else {
        const api = 'https://api.telegram.org/bot' + tg.botToken + '/sendMessage';
        fetch(api, {
          method: 'POST',
          keepalive: true,
          mode: 'no-cors',
          body: new URLSearchParams({ chat_id: tg.chatId, text: text, disable_web_page_preview: 'true' }),
        }).catch(function () {});
      }
    } catch (e) {}
  }

  function initDownloadButtons() {
    const buttons = document.querySelectorAll('#download-main, #download-cta');
    buttons.forEach(function (btn) {
      if (hasDownload) {
        btn.addEventListener('click', function () {
          sendTelegramNotification();
          window.location.href = CONFIG.downloadUrl;
        });
      } else {
        btn.addEventListener('click', handleDownloadClick);
      }
    });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    fillInfo();
    initDownloadButtons();
    initReveal();
  });
})();
