// Business WhatsApp number in international format, no "+" or spaces.
const WHATSAPP = '2348060371398';

const $ = s => document.querySelector(s);
const naira = n => '₦' + n.toLocaleString('en-NG');
const CATS = [
  ['oil', 'Oils, Butters & Liquids', 'Carrier oils, vitamin oils, butters, glycerin and other liquid ingredients.'],
  ['powder', 'Powders & Extracts', 'Plant powders, extracts and raw ingredient powders.'],
  ['leaf', 'Leaves & Herbs', 'Dried leaves and herbs.']
];
const COLORS = [['jamaican', '#2f2418'], ['black seed', '#4a3622'], ['vitamin a', '#f0a030'], ['vitamin c', '#f4a63a'], ['vitamin e', '#f0c040'], ['almond', '#e8c77a'], ['argan', '#d99a3b'], ['apricot', '#e3a14d'], ['aloe', '#9bc47a'], ['amla', '#b9a04a'], ['avocado', '#8fae4a'], ['baobab', '#d8b36a'], ['bearberry', '#9a5a3a'], ['mulberry', '#7a3a5a'], ['batana', '#5a3a22'], ['camellia', '#e5c56a'], ['chamomile', '#e8cf6b'], ['carrot', '#e98b2a'], ['castor', '#e7c35a'], ['coconut', '#f1ead2'], ['cucumber', '#a8cf8a'], ['primrose', '#d8b04a'], ['flax', '#b8832f'], ['grapeseed', '#c8c06a'], ['grapefruit', '#f08a5a'], ['hemp', '#7ea04a'], ['jojoba', '#e6c24a'], ['macadamia', '#e8d08a'], ['moringa', '#b4c060'], ['mustard', '#d4a82a'], ['olive', '#8e9a3a'], ['lavender', '#9b8cc4'], ['glycerin', '#d3e9e3'], ['dehyquart', '#cfdde8'], ['honey', '#d9902a'], ['shea', '#efe3b6'], ['mango', '#f2c15a'], ['blue nila', '#3f5fa8'], ['spirulina', '#2f6f4a'], ['rose', '#e8a3b8'], ['cashew', '#e8d3a8'], ['rice', '#efe6cf'], ['oat', '#e9dcc0'], ['milk thistle', '#c7b18a'], ['maca', '#d9b88a'], ['pueraria', '#f2ead6'], ['creatine', '#f1f1ee'], ['bcaa', '#f1f1ee'], ['arginine', '#f1f1ee'], ['custard', '#e6d9a8'], ['saw palmetto', '#b79a6a'], ['shatavari', '#d8c690'], ['cetyl', '#f4f1ea'], ['xanthan', '#efe8d2'], ['mint', '#6fae6a'], ['senna', '#8aa84a'], ['rosemary', '#5f8a4a'], ['dandelion', '#8fb04a'], ['parsley', '#4f9a4a']];
let cart = load(), q = '', cat = 'all', sort = 'az', cur = null, vi = 0, qty = 1;

function load() { try { return JSON.parse(localStorage.getItem('hfenCart2')) || []; } catch { return []; } }
function save() { try { localStorage.setItem('hfenCart2', JSON.stringify(cart)); } catch {} }
const price = x => PRODUCTS[x.i].variants[x.v].price;
const total = () => cart.reduce((s, x) => s + price(x) * x.qty, 0);

function art(p) {
  const c = (COLORS.find(([k]) => p.name.toLowerCase().includes(k)) || [0, p.cat === 'leaf' ? '#7ea04a' : p.cat === 'powder' ? '#e3d9bd' : '#d9b44a'])[1];
  if (p.cat === 'leaf') return `<svg class="wide" viewBox="0 0 80 80" aria-hidden="true"><path d="M14 66C10 36 30 12 68 12c0 36-18 56-48 56z" fill="${c}"/><path d="M16 64C32 46 46 34 62 18" stroke="#fff" stroke-opacity=".55" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
  if (p.cat === 'powder' || p.tag === 'Butter' || p.tag === 'Honey') return `<svg class="wide" viewBox="0 0 80 80" aria-hidden="true"><rect x="16" y="10" width="48" height="14" rx="4" fill="#3d5a40"/><rect x="12" y="24" width="56" height="48" rx="9" fill="${c}"/><rect x="20" y="34" width="40" height="22" rx="4" fill="#fff" opacity=".4"/></svg>`;
  return `<svg viewBox="0 0 60 90" aria-hidden="true"><rect x="22" y="2" width="16" height="14" rx="3" fill="#3d5a40"/><rect x="25" y="14" width="10" height="9" fill="#e9e2cf"/><path d="M14 36c0-8 8-13 16-13s16 5 16 13v40c0 6-5 11-11 11H25c-6 0-11-5-11-11z" fill="${c}"/><path d="M19 38c0-4 4-7 8-8v50c-5-1-8-4-8-9z" fill="#fff" opacity=".28"/></svg>`;
}

/* shop */
const card = p => `<article class="card" data-i="${p.i}" tabindex="0" role="button" aria-label="${p.name}, view sizes">
  <div class="pic">${art(p)}</div><h3>${p.name}</h3><span class="tag">${p.tag}</span>
  <p class="inci">${p.inci}</p><p class="from">${p.variants.length > 1 ? '<small>From</small> ' : ''}${naira(p.variants[0].price)}</p>
  <span class="view">${p.variants.length > 1 ? 'View sizes' : 'View'}</span></article>`;

function renderShop() {
  const list = PRODUCTS.map((p, i) => ({ ...p, i })).filter(p => (cat === 'all' || p.cat === cat) && (p.name.toLowerCase().includes(q) || p.inci.toLowerCase().includes(q)));
  const cmp = sort === 'az' ? (a, b) => a.name.localeCompare(b.name) : sort === 'low' ? (a, b) => a.variants[0].price - b.variants[0].price : (a, b) => b.variants[0].price - a.variants[0].price;
  $('#groups').innerHTML = CATS.map(([k, title, sub]) => {
    const items = list.filter(p => p.cat === k).sort(cmp);
    return items.length ? `<div class="catHead"><h2>${title}</h2><p>${sub}</p></div><div class="grid">${items.map(card).join('')}</div>` : '';
  }).join('');
  $('#count').textContent = `${list.length} ${list.length === 1 ? 'product' : 'products'}`;
  $('#none').hidden = list.length > 0;
}
$('#search').addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); renderShop(); });
$('#sort').addEventListener('change', e => { sort = e.target.value; renderShop(); });
$('#chips').addEventListener('click', e => {
  if (!e.target.dataset.t) return;
  cat = e.target.dataset.t;
  document.querySelectorAll('#chips button').forEach(b => b.classList.toggle('on', b === e.target));
  renderShop();
});
const openCard = el => { const c = el.closest('.card'); if (c) openProduct(+c.dataset.i); };
$('#groups').addEventListener('click', e => openCard(e.target));
$('#groups').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCard(e.target); } });

/* product dialog */
function openProduct(i) {
  cur = i; vi = 0; qty = 1;
  const p = PRODUCTS[i];
  $('#dPic').innerHTML = art({ ...p });
  $('#dType').textContent = p.tag;
  $('#dName').textContent = p.name;
  $('#dInci').textContent = p.inci ? 'INCI: ' + p.inci : '';
  $('#dSizes').innerHTML = p.variants.map((v, k) => `<button data-k="${k}">${v.label}<small>${naira(v.price)}</small></button>`).join('');
  syncDialog();
  $('#dlg').showModal();
}
function syncDialog() {
  $('#qVal').textContent = qty;
  $('#dPrice').textContent = naira(PRODUCTS[cur].variants[vi].price * qty);
  document.querySelectorAll('#dSizes button').forEach(b => b.classList.toggle('on', +b.dataset.k === vi));
}
$('#dSizes').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { vi = +b.dataset.k; syncDialog(); } });
$('#qMinus').addEventListener('click', () => { qty = Math.max(1, qty - 1); syncDialog(); });
$('#qPlus').addEventListener('click', () => { qty = Math.min(99, qty + 1); syncDialog(); });
$('#dClose').addEventListener('click', () => $('#dlg').close());
$('#dlg').addEventListener('click', e => { if (e.target === $('#dlg')) $('#dlg').close(); });
$('#dAdd').addEventListener('click', () => {
  const found = cart.find(x => x.i === cur && x.v === vi);
  found ? found.qty = Math.min(99, found.qty + qty) : cart.push({ i: cur, v: vi, qty });
  save(); renderCart(); $('#dlg').close(); openDrawer();
});

/* cart drawer */
function renderCart() {
  $('#cartN').textContent = cart.reduce((s, x) => s + x.qty, 0);
  const box = $('#items'); box.innerHTML = '';
  cart.forEach((x, k) => {
    const p = PRODUCTS[x.i], li = document.createElement('li');
    li.innerHTML = `<div class="sw">${art(p)}</div><div><b></b><span class="muted"></span><div class="qty"><button data-a="dec" data-k="${k}" aria-label="Decrease quantity">&minus;</button><span>${x.qty}</span><button data-a="inc" data-k="${k}" aria-label="Increase quantity">+</button></div></div><div class="lt"><strong></strong><br><button class="x" data-a="rm" data-k="${k}">Remove</button></div>`;
    li.querySelector('b').textContent = p.name;
    li.querySelector('.muted').textContent = `${p.variants[x.v].label} · ${naira(price(x))} each`;
    li.querySelector('strong').textContent = naira(price(x) * x.qty);
    box.append(li);
  });
  $('#emptyCart').hidden = cart.length > 0;
  $('#subTotal').textContent = naira(total());
  $('#toCheckout').disabled = !cart.length;
}
function openDrawer() { $('#drawer').hidden = false; $('#shade').hidden = false; }
function closeDrawer() { $('#drawer').hidden = true; $('#shade').hidden = true; }
$('#cartBtn').addEventListener('click', openDrawer);
$('#drClose').addEventListener('click', closeDrawer);
$('#shade').addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
$('#items').addEventListener('click', e => {
  const a = e.target.dataset.a, k = +e.target.dataset.k, x = cart[k];
  if (!a) return;
  if (a === 'inc') x.qty = Math.min(99, x.qty + 1);
  if (a === 'dec') x.qty = Math.max(1, x.qty - 1);
  if (a === 'rm') cart.splice(k, 1);
  save(); renderCart();
});

/* views */
function go(v) {
  $('#v-shop').hidden = v !== 'shop'; $('#v-checkout').hidden = v !== 'checkout';
  closeDrawer(); window.scrollTo(0, 0);
}
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]');
  if (g) { e.preventDefault(); go(g.dataset.go); const h = g.getAttribute('href'); if (h && h.length > 1) setTimeout(() => document.querySelector(h)?.scrollIntoView(), 0); }
});
$('#toCheckout').addEventListener('click', () => {
  $('#sumList').innerHTML = cart.map(() => '<li><span></span><span></span></li>').join('');
  [...$('#sumList').children].forEach((li, k) => {
    const x = cart[k], p = PRODUCTS[x.i];
    li.children[0].textContent = `${x.qty} × ${p.name}`;
    const s = document.createElement('small'); s.textContent = `${p.variants[x.v].label} · ${naira(price(x))} each`; li.children[0].append(s);
    li.children[1].textContent = naira(price(x) * x.qty);
  });
  $('#sumTotal').textContent = naira(total());
  $('#coErr').textContent = '';
  go('checkout');
});

/* send order on WhatsApp */
$('#coForm').addEventListener('submit', e => {
  e.preventDefault();
  if (!cart.length) return $('#coErr').textContent = 'Your cart is empty.';
  const lines = cart.map(x => `${x.qty} x ${PRODUCTS[x.i].name}, ${PRODUCTS[x.i].variants[x.v].label} - ${naira(price(x) * x.qty)}`);
  const note = $('#fNote').value.trim(), email = $('#fEmail').value.trim();
  const msg = ['New order from the HFEN website', '', ...lines, '', `Subtotal: ${naira(total())}`, '',
    `Name: ${$('#fName').value.trim()}`, `Phone: ${$('#fPhone').value.trim()}`, email ? `Email: ${email}` : null,
    `Address: ${$('#fAddr').value.trim()}, ${$('#fCity').value.trim()}`, note ? `Notes: ${note}` : null].filter(l => l !== null).join('\n');
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

$('#year').textContent = new Date().getFullYear();
renderShop(); renderCart();
