
  var APP_URL = 'https://admin.schooloffice.tech'; 

(function () {
  var base = document.body.getAttribute('data-base') || './';
  var current = document.body.getAttribute('data-page') || '';

  function markSvg(size) {
    return (
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="mg1-' + size + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1E2E52"/><stop offset="100%" stop-color="#0F1A33"/></linearGradient>' +
      '<linearGradient id="mg2-' + size + '" x1="10%" y1="0%" x2="90%" y2="100%"><stop offset="0%" stop-color="#FFB25B"/><stop offset="100%" stop-color="#E8600A"/></linearGradient>' +
      '<filter id="mgShadow-' + size + '" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0F1A33" flood-opacity="0.28"/></filter></defs>' +
      '<rect x="4" y="4" width="192" height="192" rx="46" fill="url(#mg1-' + size + ')"/>' +
      '<rect x="4.5" y="4.5" width="191" height="191" rx="45.5" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
      '<path d="M62,66 C100,44 152,52 146,82 C141,108 96,96 88,116 C81,134 116,140 150,132" fill="none" stroke="url(#mg2-' + size + ')" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" filter="url(#mgShadow-' + size + ')"/>' +
      '<circle cx="150" cy="132" r="13" fill="#FFD98A"/>' +
      '<circle cx="150" cy="132" r="13" fill="none" stroke="#0F1A33" stroke-width="2" opacity="0.15"/></svg>'
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
    { href: 'index.html#modules', label: 'Modules', key: 'modules', icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>' },
    { href: 'index.html#customers', label: 'Customers', key: 'customers', icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/>' },
    { href: 'pages/how-to-use.html', label: 'How to Use', key: 'how-to-use', icon: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>' },
    { href: 'pages/faq.html', label: 'FAQ', key: 'faq', icon: '<circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.5-2 2-2 3.5"/><path d="M12 17h.01"/>' },
    { href: 'pages/about.html', label: 'About', key: 'about', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8h.01M11 12h1v5h1"/>' },
    { href: 'pages/contact.html', label: 'Contact', key: 'contact', icon: '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/>' },
    { href: 'blog/index.html', label: 'Blog', key: 'blog', icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>' }
  ];

  function navHtml() {
    return NAV_LINKS.map(function (l) {
      var isActive = current === l.key;
      var href = l.href.indexOf('pages/') === 0 ? base + l.href : base + l.href;
      var icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + l.icon + '</svg>';
      return '<a href="' + href + '"' + (isActive ? ' class="active"' : '') + '>' + icon + '<span>' + l.label + '</span></a>';
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
      // 1. Email
      [
        'email',
        'mailto:support@schooloffice.tech',
        'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
      ],
      // 2. Facebook
      [
        'facebook', 
        'https://m.facebook.com/munirammeenakased.karauli', 
        'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
      ],
      // 3. X (Twitter)
      [
        'x', 
        'https://x.com/muniramm890', 
        'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
      ],
      // 4. Instagram
      [
        'instagram', 
        'https://www.instagram.com/itz__mani__meena/', 
        'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
      ],
      // 5. LinkedIn
      [
        'linkedin', 
        'https://www.linkedin.com/in/muniram-meena-139082256', 
        'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z'
      ],
      // 6. YouTube
      [
        'youtube', 
        'https://youtube.com/@commutativeknowldge', 
        'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
      ],
      // 7. WhatsApp
      [
        'whatsapp', 
        'https://wa.me/918000292860', 
        'M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.19.53-1.11 1.04-1.53 1.1-.41.06-.94.08-1.52-.1-.35-.11-.8-.26-1.38-.51-2.45-1.06-4.04-3.55-4.16-3.71-.12-.17-.99-1.32-.99-2.52s.63-1.79.85-2.03c.22-.24.49-.3.65-.3.17 0 .33 0 .47.01.15.01.35-.06.55.42.21.49.71 1.73.77 1.86.06.12.1.27.02.43-.08.17-.12.27-.24.41-.12.14-.26.31-.37.42-.12.12-.25.26-.11.5.14.25.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.25.12.39.1.53-.06.15-.17.63-.73.8-1 .17-.26.34-.22.58-.13.23.09 1.49.7 1.75.83.26.13.43.19.49.3.06.11.06.64-.13 1.17z'
      ]
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
            '<a href="' + base + 'mathlab/index.html">Math Lab</a>' +
          '</div>' +
          '<div class="footer-col"><h5>Company</h5>' +
            '<a href="' + base + 'pages/about.html">About us</a>' +
             '<a href="' + base + 'pages/our-team.html">Our Team</a>' + 
            '<a href="' + base + 'pages/contact.html">Contact</a>' +
          '</div>' +
          '<div class="footer-col"><h5>Legal</h5>' +
            '<a href="' + base + 'pages/privacy-policy.html">Privacy policy</a>' +
            '<a href="' + base + 'pages/disclaimer.html">Disclaimer</a>' +
            '<a href="' + base + 'pages/refund-policy.html">Refund Policy</a>' +
           
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

  function initAccordions() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-question');
      var a = item.querySelector('.faq-answer');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function (other) {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.faq-answer').style.maxHeight = null;
          }
        });
        item.classList.toggle('open', !isOpen);
        a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
      });
    });
  }

  renderHeader();
  renderFooter();
  renderModal();
  runSplash();
  initAccordions();
})();
