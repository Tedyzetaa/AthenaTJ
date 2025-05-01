export async function loadHistory() {
    const res = await fetch('/history'); return res.json();
  }
  export function addHistoryMessages(container, history) {
    history.forEach(({ role, text }) => container.appendChild(createMessageElement(text, role)));
  }