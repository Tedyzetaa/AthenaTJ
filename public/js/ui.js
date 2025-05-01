export function createMessageElement(text, sender) {
    const div = document.createElement('div'); div.className = `message ${sender}`; div.textContent = text; return div;
  }