// ============================================================
//  НАСТРОЙКИ САЙТА NEZER VISUALS
// ============================================================
//  ССЫЛКА НА СКАЧИВАНИЕ — установщик лаунчера на GitHub:
//  https://github.com/GamesLoxotron/NezerVisualsSetup/releases
// ============================================================
window.APP_CONFIG = {
  downloadUrl: 'https://github.com/NezerVisualsInventor/NezerVisualsSetup/releases/download/NezerVisualSetup/Nezer.Visuals.Launcher.Setup.1.0.0.exe',

  version: '1.0.0',
  fileName: 'Nezer.Visuals.Launcher.Setup.1.0.0.exe',
  size: '~99 МБ',
  platform: 'Windows 10/11',

  githubUrl: 'https://github.com/NezerVisualsInventor/NezerVisualsSetup',

  // ============================================================
  //  УВЕДОМЛЕНИЯ В TELEGRAM ПРИ СКАЧИВАНИИ
  // ============================================================
  //  enabled — вкл/выкл (true — уведомления работают)
  //  botToken — токен бота от @BotFather
  //  chatId   — твой ID: напиши @userinfobot любое сообщение
  //
  //  ⚠️ Токен бота виден в коде страницы — любой может его увидеть.
  //     Не выдавай боту лишних прав.
  //
  //  proxyUrl — (необязательно) адрес Google Apps Script для
  //             гарантированной доставки (см. telegram-proxy.gs).
  //             Если пусто — отправка идёт напрямую в Bot API
  //             (сообщение доставляется, но браузер не может прочитать
  //             ответ из-за CORS, поэтому ошибок не видно).
  // ============================================================
  telegram: {
    enabled: true,
    botToken: '8640796679:AAGLwEp26imMeYCNb8-c_gyXWdcgVdZ-Htg',
    chatId: '7687154828',
    proxyUrl: '',
  },
};
