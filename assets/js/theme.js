// lightweight light/dark theme toggle (no text modifications)
// (c) 2023 - 2023 Jason Miller. MIT License.

(function(){
  const KEY = 'siteTheme';
  const LIGHT = 'light';
  const DARK = 'dark';

  function apply(name){
    name = name === LIGHT ? LIGHT : DARK;
    document.documentElement.classList.remove('theme-light','theme-dark');
    document.documentElement.classList.add('theme-' + name);
    localStorage.setItem(KEY, name);
    updateToggleButton(name);
    // do not change text or images
  }

  function toggle(){
    const current = localStorage.getItem(KEY) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK);
    apply(current === LIGHT ? DARK : LIGHT);
  }

  function initToggleButton(){
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    btn.addEventListener('click', (e) => {
      toggle();
    }, {passive:true});
    // set initial aria/label
    const saved = localStorage.getItem(KEY) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK);
    apply(saved);
  }

  function updateToggleButton(activeName){
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    const isLight = activeName === LIGHT;
    btn.setAttribute('aria-pressed', String(isLight));
    btn.querySelector('.icon').textContent = isLight ? '☀️' : '🌙';
    btn.querySelector('.label').textContent = isLight ? 'Light' : 'Dark';
  }

  // apply as early as possible
  const stored = localStorage.getItem(KEY);
  if(document.readyState === 'loading'){
    document.documentElement.classList.add(stored === LIGHT ? 'theme-light' : 'theme-dark');
    document.addEventListener('DOMContentLoaded', initToggleButton);
  } else {
    document.documentElement.classList.add(stored === LIGHT ? 'theme-light' : 'theme-dark');
    initToggleButton();
  }

  window.SiteTheme = { apply, toggle };
})();