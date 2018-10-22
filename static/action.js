let confSelection = 'north';

function conf(target) {
  confSelection = target;
  document.querySelectorAll('.master').forEach(e => {
    e.classList.remove('selected');
  });

  document.querySelector(`.master.${target}`).classList.add('selected');
}

let debouncer = null;
let value;

function emailChanged() {
  const e = document.getElementById('input');
  const v = e.value;
  value = v;

  document.querySelectorAll('.email-error').forEach(e => {
    e.classList.add('hidden-hint');
  });

  if(debouncer) clearTimeout(debouncer);
  debouncer = setTimeout(async () => {
    const resp = await fetch(`/check/${v}`);
    const payload = await resp.json();

    if(v !== value) return;

    if(resp.exists)
      document.querySelectorAll('.email-error').forEach(e => {
        e.classList.remove('hidden-hint');
      });
  }, 1000);
}
