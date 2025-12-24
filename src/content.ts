// Create navigation panel
const nav = document.createElement('div');
nav.id = 'gemini-nav';
nav.innerHTML = `
  <ul id="prompt-list"></ul>
`;

// Create separate toggle button outside the toolbar
const toggleBtn = document.createElement('button');
toggleBtn.id = 'toggle-btn';
toggleBtn.innerHTML = '<span class="material-icons">menu</span>';
// Add Material Icons font
const materialIconsLink = document.createElement('link');
materialIconsLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
materialIconsLink.rel = 'stylesheet';
document.head.appendChild(materialIconsLink);

// Insert toolbar and setup
document.body.appendChild(nav);
document.body.appendChild(toggleBtn);
document.body.style.marginRight = '280px';
document.body.style.transition = 'margin-right 0.3s ease';
nav.style.display = 'flex';

// Toggle functionality
let isVisible = true;

// Update button position based on toolbar visibility
toggleBtn.addEventListener('click', () => {
  isVisible = !isVisible;
  
  if (isVisible) {
    nav.style.display = 'flex';
    document.body.style.marginRight = '280px';
    document.body.style.transition = 'margin-right 0.3s ease';
    toggleBtn.style.right = '290px';
  } else {
    nav.style.display = 'none';
    document.body.style.marginRight = '0px';
    document.body.style.transition = 'margin-right 0.3s ease';
    toggleBtn.style.right = '10px';
  }
});

// Simple prompt detection
function findPrompts() {
  // Try multiple selectors
  let prompts = document.querySelectorAll('[data-message-author-role="user"]');
  
  if (prompts.length === 0) {
    prompts = document.querySelectorAll('div[data-testid*="user"]');
  }
  
  if (prompts.length === 0) {
    prompts = document.querySelectorAll('div[class*="user"]');
  }
  
  // Fallback: look for any text that looks like prompts
  if (prompts.length === 0) {
    const allDivs = document.querySelectorAll('div');
    const userPrompts: Element[] = [];
    
    allDivs.forEach(div => {
      const text = div.textContent?.trim();
      if (text && text.length > 10 && text.length < 1000 && 
          !text.includes('Gemini') && 
          !div.querySelector('button') &&
          !div.querySelector('svg')) {
        userPrompts.push(div);
      }
    });
    
    prompts = userPrompts as any;
  }
  
  const list = document.getElementById('prompt-list');
  if (!list) return;
  
  list.innerHTML = '';
  
  if (prompts.length === 0) {
    list.innerHTML = '<li style="color: #999; padding: 10px;">No prompts found</li>';
    return;
  }
  
  Array.from(prompts).forEach((prompt, i) => {
    const text = prompt.textContent?.trim();
    if (!text || text.length < 5) return;
    
    const preview = text.length > 120 ? text.slice(0, 120) + '...' : text;
    const item = document.createElement('li');
    item.className = 'prompt-item';
    item.innerHTML = `
      <div class="prompt-number">#${prompts.length - i}</div>
      <div class="prompt-text">${preview}</div>
    `;
    item.onclick = () => prompt.scrollIntoView({ behavior: 'smooth' });
    list.appendChild(item);
  });
  
  console.log(`Found ${prompts.length} prompts`);
}

// Start finding prompts
findPrompts();
setInterval(findPrompts, 3000);
