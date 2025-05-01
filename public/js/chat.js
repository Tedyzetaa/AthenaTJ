export async function sendMessage(text, conversationId) {
    const res = await fetch('/chat', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ message: text, conversationId }) });
    return res.json();
  }
  export function showLoading(container) {
    const el = createMessageElement('...', 'model'); container.appendChild(el); return el;
  }