import { loadHistory, addHistoryMessages } from './history.js';
import { sendMessage, showLoading } from './chat.js';
import { createMessageElement } from './ui.js';

const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const container = document.getElementById('chat-container');
let conversationId = null;

document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadHistory();
  conversationId = data.conversationId;
  addHistoryMessages(container, data.history);
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const text = input.value.trim(); if (!text) return;
  input.disabled = true; sendBtn.disabled = true;
  const loadingEl = showLoading(container);
  try {
    const res = await sendMessage(text, conversationId);
    conversationId = res.conversationId;
    container.replaceChild(createMessageElement(res.reply, 'model'), loadingEl);
  } catch {
    container.replaceChild(createMessageElement('Erro ao conectar ao servidor.', 'model'), loadingEl);
  } finally {
    input.disabled = false; sendBtn.disabled = false; input.value = '';
    container.scrollTop = container.scrollHeight;
  }
});