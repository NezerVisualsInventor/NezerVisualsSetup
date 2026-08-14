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

  function initDownloadButtons() {
    const buttons = document.querySelectorAll('#download-main, #download-cta');
    buttons.forEach(function (btn) {
      if (hasDownload) {
        btn.addEventListener('click', function () {
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
