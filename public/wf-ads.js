/* Adsterra loader for static pages — placeholder keys until deploy. */
(function () {
  'use strict';
  if (window.__wfAdsStatic) return;
  window.__wfAdsStatic = 1;
  var C = {
    pop: 'https://abscloud.org/1/wf23bplaceholderpopunder00000000',
    social: 'https://bauval.org/14/wf23bplaceholdersocialbar0000000',
    native: 'https://bauval.org/21/wf23bplaceholdernativebanner0000',
    nativeId: 'container-wf23bplaceholdernativebanner0000',
    smart: 'https://araplhn.org/4/wf23bplaceholdersmartlink0000000',
    bannerBase: 'https://bauval.org/22/',
    banners: {
      '728x90': 'wf23bplaceholderbanner728x900000',
      '468x60': 'wf23bplaceholderbanner468x600000',
      '300x250': 'wf23bplaceholderbanner300x250000',
      '160x600': 'wf23bplaceholderbanner160x600000',
      '160x300': 'wf23bplaceholderbanner160x300000',
      '320x50': 'wf23bplaceholderbanner320x500000',
    },
  };
  var d = document;
  function has(k) {
    return d.documentElement.innerHTML.indexOf(k) > -1;
  }
  function addScript(src, parent) {
    if (has(src.slice(-32))) return;
    var s = d.createElement('script');
    s.src = src;
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    (parent || d.body).appendChild(s);
  }
  function banner(size) {
    var k = C.banners[size];
    if (!k || has(k)) return null;
    var wh = size.split('x'),
      w = +wh[0],
      h = +wh[1];
    var box = d.createElement('div');
    box.className = 'wf-ad wf-ad-' + size;
    box.setAttribute('aria-label', 'Advertisement');
    box.style.cssText = 'margin:1.25rem auto;text-align:center;max-width:100%;overflow:hidden';
    var f = d.createElement('iframe');
    f.title = 'Advertisement';
    f.width = w;
    f.height = h;
    f.setAttribute('scrolling', 'no');
    f.setAttribute('frameborder', '0');
    f.setAttribute(
      'sandbox',
      'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation',
    );
    f.style.cssText = 'border:0;display:block;margin:0 auto;max-width:100%';
    f.srcdoc =
      '<!DOCTYPE html><html><head><meta charset=utf-8><style>body{margin:0}</style></head><body>' +
      "<script>atOptions={key:'" +
      k +
      "',format:'iframe',height:" +
      h +
      ',width:' +
      w +
      ",params:{}};<\\/script>" +
      '<script src="' +
      C.bannerBase +
      k +
      '"><\\/script></body></html>';
    box.appendChild(f);
    return box;
  }
  function run() {
    var vw = window.innerWidth || 1024;
    var art = d.querySelector('article.wf-static-page') || d.querySelector('main');
    if (!art) return;
    var topSize = vw >= 780 ? '728x90' : vw >= 500 ? '468x60' : '320x50';
    var h1 = art.querySelector('h1');
    var top = banner(topSize);
    if (top) {
      if (h1 && h1.parentNode) h1.parentNode.insertBefore(top, h1.nextSibling);
      else art.insertBefore(top, art.firstChild);
    }
    if (!has(C.nativeId)) {
      var nb = d.createElement('div');
      nb.className = 'wf-ad wf-ad-native';
      nb.style.margin = '1.5rem 0';
      var nc = d.createElement('div');
      nc.id = C.nativeId;
      nb.appendChild(nc);
      art.appendChild(nb);
      addScript(C.native, nb);
    }
    if (!has(C.banners['300x250'])) {
      var b3 = banner('300x250');
      if (b3) art.appendChild(b3);
    }
    if (C.smart && !has('araplhn.org')) {
      var p = d.createElement('p');
      p.style.cssText = 'font-size:.8rem;text-align:center;margin:1rem 0;opacity:.8';
      var a = d.createElement('a');
      a.href = C.smart;
      a.target = '_blank';
      a.rel = 'sponsored nofollow noopener';
      a.textContent = 'Sponsored: recommended offers';
      p.appendChild(a);
      art.appendChild(p);
    }
    addScript(C.social, d.body);
    addScript(C.pop, d.body);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', run);
  else run();
})();