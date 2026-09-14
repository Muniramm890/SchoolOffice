/* =========================================================
   School Office — shared site behaviour
   One source of truth for header, footer and the inquiry modal
   so every page in /pages/ stays in sync automatically.
   ========================================================= */
  var APP_URL = 'https://dpw5tz.csb.app/'; // 👈 production deploy hone pe yahan apna real app domain daal dena

(function () {
  var base = document.body.getAttribute('data-base') || './';
  var current = document.body.getAttribute('data-page') || '';

  function markSvg(size) {
    return (
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="mg1-' + size + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1E2E52"/><stop offset="100%" stop-color="#0F1A33"/></linearGradient>' +
      '<linearGradient id="mg2-' + size + '" x1="10%" y1="0%" x2="90%" y2="100%"><stop offset="0%" stop-color="#FFB25B"/><stop offset="100%" stop-color="#E8600A"/></linearGradient></defs>' +
      '<rect x="4" y="4" width="192" height="192" rx="46" fill="url(#mg1-' + size + ')"/>' +
      '<path d="M62,66 C100,44 152,52 146,82 C141,108 96,96 88,116 C81,134 116,140 150,132" fill="none" stroke="url(#mg2-' + size + ')" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="150" cy="132" r="13" fill="#FFD98A"/></svg>'
    );
  }

  function lockup(variant, withTagline) {
    return (
      '<a href="' + base + 'index.html" class="lockup ' + variant + '" aria-label="School Office home">' +
      markSvg(34) +
      '<span class="lockup-stack"><span class="wordmark"><span class="school">School</span><span class="office">Office</span></span>' +
      (withTagline ? '<span class="tagline">Smart ERP for Smart Schools</span>' : '') +
      '</span></a>'
    );
  }

  var NAV_LINKS = [
    { href: 'index.html#modules', label: 'Modules', key: 'modules' },
    { href: 'index.html#customers', label: 'Customers', key: 'customers' },
    { href: 'pages/about.html', label: 'About', key: 'about' },
    { href: 'pages/contact.html', label: 'Contact', key: 'contact' }
  ];

  function navHtml() {
    return NAV_LINKS.map(function (l) {
      var isActive = current === l.key;
      var href = l.href.indexOf('pages/') === 0 ? base + l.href : base + l.href;
      return '<a href="' + href + '"' + (isActive ? ' class="active"' : '') + '>' + l.label + '</a>';
    }).join('');
  }

  function renderHeader() {
    var root = document.getElementById('site-header-root');
    if (!root) return;
    root.innerHTML =
      '<header class="site-header">' +
        '<div class="header-inner">' +
          lockup('dark', false) +
          '<nav class="primary-nav" id="primaryNav">' + navHtml() + '</nav>' +
         '<div class="header-cta">' +
            '<button class="btn btn-ghost btn-sm js-open-inquiry">Book a demo</button>' +
            '<a class="btn btn-ghost btn-sm" href="' + APP_URL + '" target="_blank" rel="noopener">Login</a>' +
            '<a class="btn btn-primary btn-sm" href="' + APP_URL + '?signup=1" target="_blank" rel="noopener">Register</a>' +
            '<button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>';

    var nav = document.getElementById('primaryNav');
    var toggle = document.getElementById('menuToggle');
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  function socialIcons() {
    var items = [
      ['facebook', 'https://m.facebook.com/munirammeenakased.karauli', 'M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.23 10.44 22v-7.02H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.75l-.44 2.9h-2.31V22C18.34 21.23 22 17.09 22 12.07z'],
      ['x', 'https://x.com/muniramm890', 'M18.36 2H21l-6.49 7.42L22 22h-4.87l-5.1-7.02L6.24 22H3.6l6.92-7.91L2 2h4.98l4.58 6.3L18.36 2zM17.19 20h1.33L7.1 4h-1.4l11.49 16z'],
      ['instagram', 'https://www.instagram.com/itz__mani__meena/', 'M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zM12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 2.4a2.4 2.4 0 1 1-2.4 2.4A2.4 2.4 0 0 1 12 9.6zM17.7 7.1a.9.9 0 1 1-.9-.9.9.9 0 0 1 .9.9z'],
      ['linkedin', 'https://www.linkedin.com/in/muniram-meena-139082256', 'M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v13H0V8zm7.5 0h4.78v1.8h.07c.66-1.25 2.28-2.57 4.7-2.57 5.03 0 5.95 3.3 5.95 7.59V21H18v-6.1c0-1.45-.03-3.32-2.03-3.32-2.04 0-2.35 1.6-2.35 3.2V21H7.5V8z'],
      ['youtube', 'https://youtube.com/@commutativeknowldge', 'M23.5 6.2a3 3 0 0 0-2.11-2.12C19.68 3.5 12 3.5 12 3.5s-7.68 0-9.39.58A3 3 0 0 0 .5 6.2 31.1 31.1 0 0 0 0 12a31.1 31.1 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.12C4.32 20.5 12 20.5 12 20.5s7.68 0 9.39-.58a3 3 0 0 0 2.11-2.12A31.1 31.1 0 0 0 24 12a31.1 31.1 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z'],
      ['whatsapp', 'https://wa.me/919784849176', 'M20.52 3.48A11.88 11.88 0 0012 .25C5.74.25.87 4.91.25 11.09c-.12 1.2.03 2.46.35 3.64L0 23.75l8.21-2.16c1.14.62 2.37.94 3.79.94 6.27 0 11.14-4.66 11.76-10.84.15-1.93-.24-3.78-1.24-5.21zM12 21.5c-1.19 0-2.35-.28-3.38-.8l-.24-.13-4.88 1.29 1.31-4.72-.15-.25A8.64 8.64 0 013 11.08 8.76 8.76 0 0112 3.5c4.86 0 8.82 3.57 9 8.2.15 4.09-3.12 7.8-8 9.8-.67.25-1.38.37-2 .37z']
    ];
    return items.map(function (it) {
      return '<a class="social-link ' + it[0] + '" href="' + it[1] + '" target="_blank" rel="noopener" aria-label="' + it[0] + '">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="' + it[2] + '"/></svg></a>';
    }).join('');
  }

  function renderFooter() {
    var root = document.getElementById('site-footer-root');
    if (!root) return;
    root.innerHTML =
      '<footer class="site-footer">' +
        '<div class="wrap footer-top">' +
          '<div class="footer-brand">' +
            lockup('light', true) +
            '<p>A single dashboard for admissions, attendance, timetables, fees, exams and results — built for schools across India.</p>' +
            '<div class="social-row">' + socialIcons() + '</div>' +
          '</div>' +
          '<div class="footer-col"><h5>Product</h5>' +
            '<a href="' + base + 'index.html#modules">Modules overview</a>' +
            '<a href="' + base + 'index.html#modules">Attendance &amp; fees</a>' +
            '<a href="' + base + 'index.html#customers">Customer stories</a>' +
          '</div>' +
          '<div class="footer-col"><h5>Company</h5>' +
            '<a href="' + base + 'pages/about.html">About us</a>' +
            '<a href="' + base + 'pages/contact.html">Contact</a>' +
          '</div>' +
          '<div class="footer-col"><h5>Legal</h5>' +
            '<a href="' + base + 'pages/privacy-policy.html">Privacy policy</a>' +
            '<a href="' + base + 'pages/disclaimer.html">Disclaimer</a>' +
          '</div>' +
        '</div>' +
        '<div class="wrap footer-bottom">' +
          '<span>&copy; 2026 School Office &middot; Udyam-RJ-01-0149665 &middot; Ajmer, Rajasthan</span>' +
          '<span>Educational support services &middot; NIC 85500</span>' +
        '</div>' +
      '</footer>';
  }

  function renderModal() {
    if (document.getElementById('inquiryModal')) return;
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="modal-overlay" id="inquiryModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">' +
        '<div class="modal">' +
          '<button class="modal-close" id="modalCloseBtn" aria-label="Close">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>' +
          '</button>' +
          '<div class="modal-brand">' + markSvg(40) +
            '<span class="wordmark"><span class="school" style="color:#14213D">School</span><span class="office">Office</span></span>' +
            '<span class="tagline" style="color:var(--muted)">Smart ERP for Smart Schools</span>' +
          '</div>' +
          '<h3 id="modalTitle">Request a demo</h3>' +
          '<p class="modal-sub">Tell us about your school and we\'ll set up a walkthrough of the modules you need.</p>' +
          '<form id="googleSheetForm">' +
            '<div class="field-grid">' +
              '<div class="field"><label for="f-name">Full name</label><input id="f-name" type="text" name="name" placeholder="Contact person" required></div>' +
              '<div class="field"><label for="f-designation">Designation</label><select id="f-designation" name="designation" required>' +
                '<option value="Principal">Principal / Director</option><option value="Admin">Administrator</option>' +
                '<option value="Teacher">Teacher / Coordinator</option><option value="Trustee">Trustee / Owner</option></select></div>' +
              '<div class="field"><label for="f-phone">Mobile number</label><input id="f-phone" type="tel" name="phone" placeholder="98765 43210" required></div>' +
              '<div class="field"><label for="f-email">Official email</label><input id="f-email" type="email" name="email" placeholder="school@example.com" required></div>' +
              '<div class="field full"><label for="f-school">School name</label><input id="f-school" type="text" name="school" placeholder="Full institution name" required></div>' +
              '<div class="field full"><label for="f-address">Address</label><textarea id="f-address" name="address" rows="2" placeholder="City, district, state" required></textarea></div>' +
              '<div class="field full"><label for="f-module">Modules you\'d like to see</label><select id="f-module" name="module">' +
                '<option value="Full ERP">Full ERP (all modules)</option><option value="Online Exam (CBT)">Online exams (CBT)</option>' +
                '<option value="Question Paper Gen">Question paper generator</option><option value="SIS & Attendance">Student directory &amp; attendance</option>' +
                '<option value="HR & Payroll">Staff HR &amp; payroll</option><option value="LMS">E-learning &amp; LMS</option>' +
                '<option value="Communication">Communication hub</option><option value="Homework">Homework &amp; assignments</option>' +
                '<option value="Transport">Transport management</option><option value="Analytics">Analytics dashboard</option>' +
                '<option value="Other">Something else</option></select></div>' +
              '<div class="field full" id="otherInputContainer" style="display:none;"><label for="f-other">Tell us what you need</label><input id="f-other" type="text" name="other_module" placeholder="Describe the feature or requirement"></div>' +
              '<div class="field full"><label for="f-message">Anything else</label><textarea id="f-message" name="message" rows="2" placeholder="Optional"></textarea></div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary" id="submitBtn" style="width:100%;">Send inquiry</button>' +
            '<div class="form-status" id="formStatus"></div>' +
          '</form>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap.firstElementChild);

    var modal = document.getElementById('inquiryModal');
    function openInquiry() { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeInquiry() { modal.classList.remove('open'); document.body.style.overflow = ''; }
    window.openInquiry = openInquiry;

    document.getElementById('modalCloseBtn').addEventListener('click', closeInquiry);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeInquiry(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeInquiry(); });
    document.querySelectorAll('.js-open-inquiry').forEach(function (btn) {
      btn.addEventListener('click', openInquiry);
    });

    document.getElementById('f-module').addEventListener('change', function () {
      var box = document.getElementById('otherInputContainer');
      var other = document.getElementById('f-other');
      var isOther = this.value === 'Other';
      box.style.display = isOther ? 'block' : 'none';
      other.required = isOther;
    });

    var scriptURL = 'https://script.google.com/macros/s/AKfycbwagt2XWOUpf_N7ILyKhfIwbXy1Ad0RxFrkEkT2lAjfQi6OG9fpVz_-wRjaul8jZt-hCg/exec';
    var form = document.getElementById('googleSheetForm');
    var submitBtn = document.getElementById('submitBtn');
    var status = document.getElementById('formStatus');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      status.textContent = '';
      status.className = 'form-status';

      var formData = new FormData(form);
      var jsonData = {};
      formData.forEach(function (value, key) { jsonData[key] = value; });

      fetch(scriptURL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(jsonData)
      }).then(function () {
        status.textContent = "Thanks — we've received your inquiry and will reach out shortly.";
        status.className = 'form-status ok';
        form.reset();
        document.getElementById('otherInputContainer').style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send inquiry';
        setTimeout(closeInquiry, 2200);
      }).catch(function () {
        status.textContent = 'Something went wrong. Please try again or call us directly.';
        status.className = 'form-status err';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send inquiry';
      });
    });
  }

  function runSplash() {
    var splash = document.getElementById('splash');
    if (!splash) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var delay = reduced ? 150 : 1400;
    window.addEventListener('load', function () {
      setTimeout(function () {
        splash.classList.add('hide');
        setTimeout(function () { splash.remove(); }, 550);
      }, delay);
    });
  }

  renderHeader();
  renderFooter();
  renderModal();
  runSplash();
})();
