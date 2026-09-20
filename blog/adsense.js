/* ============================================================
   Google AdSense — centralized loader for /blog/ pages only.
   ------------------------------------------------------------
   TODO once your AdSense account is approved:
   1. Replace ca-pub-XXXXXXXXXXXXXXXX below with your real
      publisher ID (Google gives you this after approval).
   2. That's it — every blog page that includes this file
      (via <script src="adsense.js"></script> in <head>) will
      pick up the change automatically. You never need to edit
      individual post files again for this.

   This file is intentionally NOT linked from index.html,
   about.html, mathlab/, or any non-blog page — ads should only
   ever load on /blog/ pages.
   ============================================================ */

(function () {
  var PUBLISHER_ID = "ca-pub-XXXXXXXXXXXXXXXX"; // 👈 replace after AdSense approval

  if (PUBLISHER_ID.indexOf("XXXX") !== -1) {
    // Not yet configured — do nothing, so placeholder ad-slot
    // boxes on the page just show their dashed-border fallback.
    return;
  }

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + PUBLISHER_ID;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
})();
