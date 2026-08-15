/**
 * Прокси для отправки уведомлений в Telegram (опционально).
 *
 * Зачем: при прямой отправке из браузера на api.telegram.org
 * браузер блокирует чтение ответа (CORS), хотя сообщение доходит.
 * С этим прокси доставка гарантирована и видна в ответе.
 *
 * Как развернуть:
 * 1. Открой https://script.google.com и создай новый проект.
 * 2. Вставь этот код полностью.
 * 3. Меню "Развернуть" → "Новое развертывание".
 *    Тип: "Веб-приложение".
 *    Исполнитель: "Я". Доступ: "Все" (или "Все, у кого есть ссылка").
 * 4. Скопируй URL вида:
 *    https://script.google.com/macros/s/XXXX/exec
 * 5. Вставь его в js/config.js → telegram.proxyUrl.
 *
 * Секретность: бот-токен передаётся в теле запроса, как и в прямом
 * режиме — на сервер Google. Если хочешь скрыть токен, впиши его
 * ниже (TG_BOT_TOKEN) и удали d.bot_token из обработчика.
 */

var TG_BOT_TOKEN = ''; // можно задать здесь, если не хочешь передавать токен из сайта

function doPost(e) {
  var d;
  try {
    d = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad json' });
  }

  var token = TG_BOT_TOKEN || d.bot_token || '';
  var chatId = d.chat_id || '';
  var text = d.text || '';

  if (!token || !chatId || !text) {
    return json_({ ok: false, error: 'missing params' });
  }

  var url = 'https://api.telegram.org/bot' + token + '/sendMessage';
  var payload = {
    chat_id: chatId,
    text: text,
    disable_web_page_preview: true,
  };

  var result;
  try {
    result = UrlFetchApp.fetch(url, {
      method: 'post',
      payload: payload,
      muteHttpExceptions: true,
    });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }

  return json_({ ok: result.getResponseCode() === 200 });
}

function doGet() {
  return json_({ ok: true, message: 'Telegram notify proxy works' });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
