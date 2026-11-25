'use strict';
(function () {
  var HOOK = 'https://hook.eu2.make.com/t4rag48xji3xrdcvp6oplzr3ndt7iqcn';
  var DE = window.ZUIK_DE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- data ---------- */
  var EVENTS = [
    { start: '2026-11-20T18:00:00+01:00', end: '2026-11-20T19:00:00+01:00',
      uk: { title: 'Вебінар «Grundversorgung: чому вимагають повернути гроші і як цього уникнути»', meta: 'Онлайн · Google Meet · спікер: адвокат Андрій Іванський (Rechtsanwaltskammer Wien)' },
      de: { title: 'Webinar „Grundversorgung: Warum Geld zurückgefordert wird und wie man das vermeidet“', meta: 'Online · Google Meet · Referent: Andrij Iwanskyj (Rechtsanwaltskammer Wien)' },
      link: 'https://drive.google.com/drive/folders/1mT_DVy0KDGTiktRIk_5nHWlubQg3xwAd',
      linkLabel: { uk: 'Фото · матеріали', de: 'Fotos · Materialien' } },
    { start: '2026-05-30T12:00:00+02:00', end: '2026-05-30T14:00:00+02:00',
      uk: { title: 'Установчі збори: рішення створити ZUIK', meta: 'Відень · ухвалено статут асоціації' },
      de: { title: 'Gründungsversammlung: Beschluss zur Gründung von ZUIK', meta: 'Wien · Beschluss der Statuten' },
      link: 'https://drive.google.com/file/d/1HcWIppWajtuuN1Nw6S7OHNpZRVoAKWRT/view', linkLabel: { uk: 'Статут', de: 'Statuten' } }
  ];
  var MATERIALS = [
    { cat: 'docs', type: 'PDF', url: 'https://www.asyl.at/files/uploads/1046/vertriebene-aus-der-ukraine-260101_ukrainisch.pdf',
      uk: ['Grundversorgung: правила українською', 'Що потрібно повідомляти, щоб не втратити допомогу. Матеріал asylkoordination österreich.'],
      de: ['Grundversorgung: Regeln auf Ukrainisch', 'Was gemeldet werden muss, um die Leistung nicht zu verlieren. Material der asylkoordination österreich.'] },
    { cat: 'docs', type: 'Web', url: 'https://www.oesterreich.gv.at',
      uk: ['oesterreich.gv.at — державний портал', 'Офіційні пояснення щодо Meldezettel, документів, сім’ї, роботи та податків.'],
      de: ['oesterreich.gv.at – Amtsportal', 'Offizielle Informationen zu Meldezettel, Dokumenten, Familie, Arbeit und Steuern.'] },
    { cat: 'work', type: 'Web', url: 'https://www.ams.at',
      uk: ['AMS — служба зайнятості', 'Реєстрація як шукач роботи, вакансії, курси німецької та перекваліфікація.'],
      de: ['AMS – Arbeitsmarktservice', 'Arbeitssuchend melden, offene Stellen, Deutschkurse und Weiterbildung.'] },
    { cat: 'work', type: 'Web', url: 'https://www.berufsanerkennung.at',
      uk: ['Визнання диплома та кваліфікацій', 'Портал Австрійського інтеграційного фонду (ÖIF): як визнати освіту й професію, є українською.'],
      de: ['Anerkennung von Abschlüssen', 'Portal des Österreichischen Integrationsfonds (ÖIF) zur Anerkennung von Ausbildung und Beruf, auch auf Ukrainisch.'] },
    { cat: 'business', type: 'Web', url: 'https://www.gruenderservice.at',
      uk: ['Gründerservice WKO', 'Як відкрити Gewerbe чи фірму: покрокові інструкції та безкоштовні консультації Торгової палати.'],
      de: ['Gründerservice der WKO', 'Gewerbe oder Firma gründen: Schritt-für-Schritt-Infos und kostenlose Beratung der Wirtschaftskammer.'] },
    { cat: 'housing', type: 'Web', url: 'https://www.wohnberatung-wien.at',
      uk: ['Wohnberatung Wien', 'Консультації щодо муніципального та соціального житла у Відні.'],
      de: ['Wohnberatung Wien', 'Beratung zu Gemeindewohnungen und geförderten Wohnungen in Wien.'] }
  ];

  /* ---------- language ---------- */
  var lang = store('zuik-lang') === 'de' ? 'de' : 'uk';
  var UK = {}, UKPH = {};
  $$('[data-i]').forEach(function (n) { UK[n.dataset.i] = n.innerHTML; });
  $$('[data-i-ph]').forEach(function (n) { UKPH[n.dataset.iPh] = n.getAttribute('placeholder'); });
  function L(o) { return o[lang] || o.uk; }
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i]').forEach(function (n) { var v = lang === 'de' ? DE[n.dataset.i] : UK[n.dataset.i]; if (v != null) n.innerHTML = v; });
    $$('[data-i-ph]').forEach(function (n) { var v = lang === 'de' ? DE[n.dataset.iPh] : UKPH[n.dataset.iPh]; if (v != null) n.setAttribute('placeholder', v); });
    $$('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    renderEvents(); renderMaterials();
  }
  $$('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { lang = b.dataset.lang; store('zuik-lang', lang); applyLang(); }); });
  var MSG = {
    sending: { uk: 'Надсилаємо…', de: 'Wird gesendet…' },
    fail: { uk: 'Не вдалося надіслати. Спробуйте ще раз або напишіть на info@zuik.at.', de: 'Senden fehlgeschlagen. Bitte erneut versuchen oder an info@zuik.at schreiben.' },
    required: { uk: 'Заповніть обов’язкові поля та позначте згоди.', de: 'Bitte Pflichtfelder ausfüllen und Zustimmungen ankreuzen.' },
    email: { uk: 'Перевірте e-mail.', de: 'Bitte E-Mail prüfen.' },
    askOk: { uk: 'Дякуємо! Ми відповімо на ваш e-mail протягом 2 робочих днів.', de: 'Danke! Wir antworten innerhalb von 2 Werktagen per E-Mail.' },
    askEmail: { uk: 'Вкажіть e-mail, щоб ми могли відповісти.', de: 'Bitte geben Sie Ihre E-Mail für die Antwort an.' },
    noEvent: { uk: 'Анонс наступної події — незабаром', de: 'Die nächste Veranstaltung wird bald angekündigt' },
    noEventSub: { uk: 'Станьте членом ZUIK — і першими отримаєте запрошення.', de: 'Werden Sie Mitglied – und erhalten Sie die Einladung zuerst.' },
    soon: { uk: 'Скоро', de: 'Demnächst' },
    none: { uk: 'Нових подій поки немає — анонс з’явиться тут і в розсилці для членів.', de: 'Derzeit keine neuen Termine – Ankündigungen erscheinen hier und im Mitglieder-Newsletter.' },
    open: { uk: 'Відкрити →', de: 'Öffnen →' },
    nothing: { uk: 'Нічого не знайдено.', de: 'Nichts gefunden.' },
    online: { uk: 'Анонс · безкоштовно', de: 'Ankündigung · kostenlos' }
  };

  /* ---------- header ---------- */
  var top = $('.top');
  if (top) addEventListener('scroll', function () { top.classList.toggle('scrolled', scrollY > 4); }, { passive: true });
  var menuBtn = $('.menu-btn'), nav = $('.nav');
  if (menuBtn) menuBtn.addEventListener('click', function () { var o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o)); });

  /* ---------- counter ---------- */
  function showCount(n) { $$('[data-count]').forEach(function (e) { e.textContent = n; }); }
  function loadCount() {
    var c = null; try { c = JSON.parse(sessionStorage.getItem('zuik-count') || 'null'); } catch (e) {}
    if (c && Date.now() - c.t < 10 * 60 * 1000) { showCount(c.n); return; }
    fetch(HOOK + '?type=count').then(function (r) { return r.json(); }).then(function (d) {
      if (typeof d.count === 'number') { showCount(d.count); try { sessionStorage.setItem('zuik-count', JSON.stringify({ n: d.count, t: Date.now() })); } catch (e) {} }
    }).catch(function () { showCount('37+'); });
  }
  if ($('[data-count]')) loadCount();

  /* ---------- drawer ---------- */
  var drawer = $('#join'), lastFocus = null;
  function openJoin() {
    lastFocus = document.activeElement; drawer.hidden = false;
    requestAnimationFrame(function () { document.body.classList.add('drawer-open'); var f = $('input', drawer); if (f) f.focus(); });
    if (location.hash !== '#join') history.replaceState(null, '', '#join');
  }
  function closeJoin() {
    document.body.classList.remove('drawer-open');
    setTimeout(function () { drawer.hidden = true; }, 260);
    if (location.hash === '#join') history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus) lastFocus.focus();
  }
  $$('[data-join]').forEach(function (b) { b.addEventListener('click', openJoin); });
  $$('[data-close]').forEach(function (b) { b.addEventListener('click', closeJoin); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) closeJoin(); });
  if (location.hash === '#join') openJoin();

  function post(data) {
    data.lang = lang;
    return fetch(HOOK, { method: 'POST', body: new URLSearchParams(data) }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text().then(function (t) { try { return JSON.parse(t); } catch (e) { return {}; } });
    });
  }
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var joinF = $('#joinF');
  if (joinF) joinF.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = joinF.elements, st = $('#joinStatus'), btn = $('button[type=submit]', joinF);
    st.className = 'status';
    if (!f.first_name.value.trim() || !f.last_name.value.trim() || !f.c_statute.checked || !f.c_privacy.checked) { st.textContent = L(MSG.required); st.classList.add('err'); return; }
    if (!emailRe.test(f.email.value.trim())) { st.textContent = L(MSG.email); st.classList.add('err'); f.email.focus(); return; }
    btn.disabled = true; st.textContent = L(MSG.sending);
    post({ type: 'join', first_name: f.first_name.value.trim(), last_name: f.last_name.value.trim(), email: f.email.value.trim(),
      phone: f.phone.value.trim(), land: f.land.value, interest: f.interest.options[f.interest.selectedIndex].text,
      newsletter: f.newsletter.checked ? 'yes' : 'no', consent: 'yes', website: f.website.value })
      .then(function (d) {
        $('#joinForm').hidden = true; $('#joinDone').hidden = false;
        if (typeof d.count === 'number') { showCount(d.count); $('#doneCount').textContent = d.count; try { sessionStorage.removeItem('zuik-count'); } catch (e) {} }
        if (d.new === false) { $('#doneAgain').hidden = false; $('[data-i=doneText]').hidden = true; }
        $('.close', drawer).focus();
      })
      .catch(function () { st.textContent = L(MSG.fail); st.classList.add('err'); })
      .then(function () { btn.disabled = false; });
  });

  /* ---------- question ---------- */
  var askF = $('#askF');
  if (askF) {
    var ta = askF.elements.question;
    var grow = function () { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 180) + 'px'; };
    ta.addEventListener('input', function () { grow(); if (ta.value.trim()) askF.classList.add('open'); });
    ta.addEventListener('focus', function () { askF.classList.add('open'); });
    askF.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = askF.elements, st = $('#askStatus'), btn = $('button[type=submit]', askF);
      st.className = 'status';
      if (!f.question.value.trim()) { f.question.focus(); return; }
      if (!emailRe.test(f.email.value.trim())) { askF.classList.add('open'); st.textContent = L(MSG.askEmail); st.classList.add('err'); f.email.focus(); return; }
      btn.disabled = true; st.textContent = L(MSG.sending);
      post({ type: 'question', question: f.question.value.trim(), email: f.email.value.trim(), name: f.name.value.trim(), website: f.website.value })
        .then(function () { askF.reset(); grow(); askF.classList.remove('open'); st.textContent = L(MSG.askOk); st.classList.add('ok'); })
        .catch(function () { st.textContent = L(MSG.fail); st.classList.add('err'); })
        .then(function () { btn.disabled = false; });
    });
  }

  /* ---------- events ---------- */
  var MONTHS = { uk: ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'], de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'] };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function viennaDate(iso) { return new Date(iso).toLocaleDateString('de-AT', { timeZone: 'Europe/Vienna', day: '2-digit', month: '2-digit', year: 'numeric' }); }
  function viennaParts(iso) { var d = new Date(iso); return { day: d.toLocaleDateString('de-AT', { timeZone: 'Europe/Vienna', day: '2-digit' }), mon: MONTHS[lang][+d.toLocaleDateString('en-GB', { timeZone: 'Europe/Vienna', month: 'numeric' }) - 1], time: d.toLocaleTimeString('de-AT', { timeZone: 'Europe/Vienna', hour: '2-digit', minute: '2-digit' }) }; }
  function eventCard(ev) {
    var p = viennaParts(ev.start), x = L(ev);
    return '<div class="event-card"><div class="date">' + p.day + '<small>' + p.mon + '</small></div><div class="body"><div class="kicker">' + L(MSG.online) + '</div><h3>' + esc(x.title) + '</h3><p>' + viennaDate(ev.start) + ', ' + p.time + ' · ' + esc(x.meta) + '</p></div>' +
      (ev.register ? '<a class="btn btn-white" href="' + esc(ev.register) + '" target="_blank" rel="noopener">' + (lang === 'de' ? 'Anmelden' : 'Записатися') + '</a>' : '') + '</div>';
  }
  function renderEvents() {
    var now = Date.now();
    var up = EVENTS.filter(function (e) { return Date.parse(e.end) > now; }).sort(function (a, b) { return Date.parse(a.start) - Date.parse(b.start); });
    var past = EVENTS.filter(function (e) { return Date.parse(e.end) <= now; }).sort(function (a, b) { return Date.parse(b.start) - Date.parse(a.start); });
    var next = $('#nextEvent');
    if (next) next.innerHTML = up.length ? eventCard(up[0]) :
      '<div class="event-card quiet"><div class="date">✦</div><div class="body"><div class="kicker">' + L(MSG.soon) + '</div><h3>' + L(MSG.noEvent) + '</h3><p>' + L(MSG.noEventSub) + '</p></div></div>';
    var upc = $('#upcoming');
    if (upc) upc.innerHTML = up.length ? up.map(eventCard).join('') : '<p class="empty">' + L(MSG.none) + '</p>';
    var ar = $('#archive');
    if (ar) ar.innerHTML = past.map(function (e) {
      var x = L(e);
      return '<div class="list-row"><time>' + viennaDate(e.start) + '</time><span>' + esc(x.title) + ' · <span class="empty">' + esc(x.meta) + '</span></span>' +
        (e.link ? '<a href="' + esc(e.link) + '" target="_blank" rel="noopener">' + esc(L(e.linkLabel)) + '</a>' : '<span></span>') + '</div>';
    }).join('');
  }

  /* ---------- materials ---------- */
  var cat = 'all';
  function renderMaterials() {
    var box = $('#matCards'); if (!box) return;
    var q = ($('#matSearch').value || '').toLowerCase().trim();
    var names = {}; $$('.chip').forEach(function (c) { names[c.dataset.cat] = c.textContent; });
    var list = MATERIALS.filter(function (m) {
      if (cat !== 'all' && m.cat !== cat) return false;
      if (!q) return true;
      return (m.uk.join(' ') + ' ' + m.de.join(' ') + ' ' + m.url).toLowerCase().indexOf(q) > -1;
    });
    box.innerHTML = list.length ? list.map(function (m) {
      var x = L(m);
      return '<article class="card"><div class="meta"><span>' + esc(names[m.cat] || '') + '</span><span>' + m.type + '</span></div><h3>' + esc(x[0]) + '</h3><p>' + esc(x[1]) + '</p><a href="' + esc(m.url) + '" target="_blank" rel="noopener">' + L(MSG.open) + '</a></article>';
    }).join('') : '<p class="empty">' + L(MSG.nothing) + '</p>';
  }
  $$('.chip').forEach(function (c) { c.addEventListener('click', function () { cat = c.dataset.cat; $$('.chip').forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); }); renderMaterials(); }); });
  var ms = $('#matSearch'); if (ms) ms.addEventListener('input', renderMaterials);

  /* ---------- gallery (loads Google Drive only on click) ---------- */
  var GAL = 'https://drive.google.com/embeddedfolderview?id=1d_YJFLBp097bbFx5ufgxkftwwXCZaljJ#grid';
  $$('[data-gal-load]').forEach(function (b) {
    b.addEventListener('click', function () {
      var g = b.closest('[data-gallery]');
      g.innerHTML = '<iframe src="' + GAL + '" title="ZUIK Galerie" loading="lazy"></iframe>';
      g.classList.add('loaded');
    });
  });

  applyLang();
})();
