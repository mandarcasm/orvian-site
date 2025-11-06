// year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// mobile menu
const menu = document.getElementById('menu');
const nav = document.querySelector('.nav');
if (menu && nav){
  menu.addEventListener('click', ()=>{
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
  });
}

// underline follow for nav
if (nav){
  const underline = nav.querySelector('.underline');
  const links = nav.querySelectorAll('a:not(.cta)');
  const move = (el)=>{
    const r = el.getBoundingClientRect();
    underline.style.width = r.width + 'px';
    underline.style.left = (el.offsetLeft) + 'px';
  };
  links.forEach(a=>a.addEventListener('mouseenter', ()=>move(a)));
  nav.addEventListener('mouseleave', ()=>{ underline.style.width='0'; });
}

// contact form ajax for Formspree
const form = document.getElementById('enquiry');
if (form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const status = document.getElementById('status');
    status.textContent = 'Sending…';
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok){
        status.textContent = 'Thanks. We will respond shortly.';
        form.reset();
      } else {
        const body = await res.json().catch(()=>({}));
        status.textContent = body?.errors ? body.errors.map(e=>e.message).join(', ') : 'Failed to submit. Check form endpoint.';
      }
    } catch(err){
      status.textContent = 'Network error. Check your connection.';
    }
  });
}
