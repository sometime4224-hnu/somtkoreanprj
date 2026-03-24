(function () {
  'use strict';

  const FOOTER_ID = 'site-copyright-footer';
  const STYLE_ID = 'site-copyright-style';
  const SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : '';

  if (document.getElementById(FOOTER_ID)) return;

  function init() {
    if (document.getElementById(FOOTER_ID)) return;
    injectStyle();
    injectFooter();
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${FOOTER_ID} {
        margin-top: 28px;
        padding: 18px 16px 28px;
        color: #64748b;
        font-size: 11px;
        line-height: 1.7;
        text-align: center;
      }

      #${FOOTER_ID} .site-copyright-inner {
        width: min(960px, 100%);
        margin: 0 auto;
        padding-top: 14px;
        border-top: 1px solid rgba(148, 163, 184, 0.24);
      }

      #${FOOTER_ID} p {
        margin: 0;
      }

      #${FOOTER_ID} p + p {
        margin-top: 4px;
      }

      #${FOOTER_ID} a {
        color: #475569;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }

  function injectFooter() {
    const footer = document.createElement('footer');
    footer.id = FOOTER_ID;

    const licenseHref = getLicenseHref();
    footer.innerHTML = `
      <div class="site-copyright-inner">
        <p>© 2026 SOMT Korean Project. All rights reserved.</p>
        <p>본 웹사이트의 소스코드, 문구, 이미지, 오디오 및 교육 자료의 무단 복제, 재배포, 재판매 또는 상업적 이용을 금합니다.</p>
        <p><a href="${licenseHref}">이용조건 보기</a></p>
      </div>
    `;

    document.body.appendChild(footer);
  }

  function getLicenseHref() {
    if (!SCRIPT_SRC) return 'LICENSE.md';

    try {
      const url = new URL(SCRIPT_SRC, window.location.href);
      const rootHref = url.href.replace(/shared\/site-copyright\.js(?:\?.*)?$/, '');
      return rootHref + 'LICENSE.md';
    } catch (error) {
      return 'LICENSE.md';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
