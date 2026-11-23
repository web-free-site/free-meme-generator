/* Adsterra loader for static pages — placeholder keys until deploy. */
(function () {
  'use strict';
  if (window.__wfAdsStatic) return;
  window.__wfAdsStatic = 1;
  var C = {
    pop: 'https://abscloud.org/1/d9939bc05b680f54716f3de83fdc2258',
    social: 'https://bauval.org/14/bada27819bcd3fa99c3a1ebe3d4e9cd7',
    native: 'https://bauval.org/21/9d2a68a3c579ec29c8ce1b88705bbb8d',
    nativeId: 'container-9d2a68a3c579ec29c8ce1b88705bbb8d',
    smart: 'https://araplhn.org/4/2fef6487c98fd2e12bfa3a9d38da9c2c',
    bannerBase: 'https://bauval.org/22/',
    banners: {
      '728x90': '296bed53a6fd5a7bb9a7831fade651e4',
      '468x60': 'ffcda077ee626a3d6a50455d5dafff02',
      '300x250': 'd29ed041f6d9149c30ca1d74fb4d5f79',
      '160x600': 'eee9ee73cd97ba54809e356e0ee9a075',
      '160x300': '21da304ff2c17568b6fb003a73fb79c8',
      '320x50': 'a324c275e3796c9565b4807b3eba40fe',
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