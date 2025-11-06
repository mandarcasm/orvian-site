// minimal micro-interactions and form handling
const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

// mobile menu
const menu = document.getElementById('menu');
const nav = document.querySelector('.nav');
if (menu && nav){
  menu.addEventListener('click', ()=>{
    const open = nav.style.display === 'block';
    nav.style.display = open ? 'none' : 'block';
  });
}

// contact form ajax
const form = document.getElementById('enquiry');
if (form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const status = document.getElementById('status');
    status.textContent = 'Sending…';
    try {
      const data = new FormData(form);
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }});
      if (res.ok){
        status.textContent = 'Thanks. We will respond shortly.';
        form.reset();
      } else {
        status.textContent = 'Failed to submit. Try again later.';
      }
    } catch(e){
      status.textContent = 'Network error. Try again.';
    }
  });
}
