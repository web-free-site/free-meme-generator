const BANNER_BASE = 'https://bauval.org/22';

function bannerSrcDoc(key, width, height) {
  const atOptions = JSON.stringify({ key, format: 'iframe', height, width, params: {} });
  const src = `${BANNER_BASE}/${key}`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;overflow:hidden;background:transparent"><script>var atOptions = ${atOptions};</script><script src="${src}"></script></body></html>`;
}

function injectScript(src, marker, target) {
  if (!src || document.querySelector(`script[data-ad="${marker}"]`)) return;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.setAttribute('data-cfasync', 'false');
  script.setAttribute('data-ad', marker);
  target.appendChild(script);
}

async function loadAds() {
  try {
    const res = await fetch('./ads.json', { cache: 'no-store' });
    return await res.json();
  } catch {
    return { enabled: false };
  }
}

function mountBanner(host, def, label) {
  host.innerHTML = '';
  host.classList.add('wf-ad-mounted');
  const aside = document.createElement('aside');
  aside.className = 'wf-ad-slot-inner';
  aside.setAttribute('aria-label', label);
  const frame = document.createElement('iframe');
  frame.title = label;
  frame.width = def.width;
  frame.height = def.height;
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms',
  );
  frame.style.cssText = `border:0;max-width:100%;width:min(100%, ${def.width}px);height:${def.height}px;overflow:hidden`;
  frame.srcdoc = bannerSrcDoc(def.key, def.width, def.height);
  aside.appendChild(frame);
  host.appendChild(aside);
}

function mountNative(host, native) {
  host.innerHTML = '';
  const wrap = document.createElement('aside');
  wrap.className = 'wf-ad-slot-inner';
  wrap.setAttribute('aria-label', 'Advertisement');
  const box = document.createElement('div');
  box.id = native.containerId;
  wrap.appendChild(box);
  host.appendChild(wrap);
  injectScript(native.src, `native-${native.containerId}`, box);
}

export async function initSiteAds() {
  const cfg = await loadAds();
  if (!cfg?.enabled) return;

  if (cfg.socialBar) injectScript(cfg.socialBar, 'social-bar', document.body);
  if (cfg.popunder) injectScript(cfg.popunder, 'popunder', document.head);

  document.querySelectorAll('[data-ad-slot]').forEach((host) => {
    const slot = host.getAttribute('data-ad-slot');
    const mapped = cfg.slots?.[slot] ?? slot;
    if (mapped === 'nativeBanner' || slot === 'nativeBelowResult') {
      if (cfg.nativeBanner?.src) mountNative(host, cfg.nativeBanner);
      return;
    }
    const def = cfg.banners?.[mapped];
    if (def?.key) mountBanner(host, def, 'Advertisement');
  });

  const sticky = document.getElementById('wf-ad-sticky');
  if (sticky) {
    const def = cfg.banners?.[cfg.slots?.mobileSticky320x50 ?? 'banner320x50'];
    if (def?.key) {
      mountBanner(sticky, def, 'Sponsored');
      sticky.hidden = false;
    }
  }

  const smart = document.getElementById('wf-smartlink');
  if (smart && cfg.smartlink?.url) {
    const a = document.createElement('a');
    a.href = cfg.smartlink.url;
    a.target = '_blank';
    a.rel = 'sponsored noopener noreferrer';
    a.textContent = cfg.smartlink.label || 'Sponsored';
    smart.appendChild(a);
  }
}

initSiteAds();