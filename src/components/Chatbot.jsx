import { useCallback, useEffect, useRef } from 'react';

const injectSrc = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
const botSrc = 'https://files.bpcontent.cloud/2026/03/02/17/20260302171104-QSWM51L5.js';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        existing.dataset.loaded = 'true';
        resolve();
      };

      const fail = () => {
        if (settled) return;
        settled = true;
        reject(new Error(`Failed to load ${src}`));
      };

      // Existing script tags may already be loaded (and won't emit load again).
      const fallbackId = window.setTimeout(finish, 1500);

      existing.addEventListener('load', () => {
        window.clearTimeout(fallbackId);
        finish();
      }, { once: true });

      existing.addEventListener('error', () => {
        window.clearTimeout(fallbackId);
        fail();
      }, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

const BotpressChat = () => {
  const hasStartedLoadingRef = useRef(false);

  const startLoading = useCallback(async () => {
    if (hasStartedLoadingRef.current) return;
    hasStartedLoadingRef.current = true;

    try {
      await loadScript(injectSrc);
      await loadScript(botSrc);
    } catch {
      hasStartedLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(connection?.saveData);
    const isMobileViewport = window.innerWidth < 768;
    const shouldAutoLoad = !isMobileViewport && !saveData;

    if (!shouldAutoLoad) return undefined;

    let timeoutId = null;
    let idleId = null;

    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(() => {
          startLoading();
        }, { timeout: 30000 });
      } else {
        timeoutId = window.setTimeout(() => {
          startLoading();
        }, 24000);
      }
    };

    scheduleLoad();

    return () => {
      if (idleId !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [startLoading]);

  // Render nothing — the Botpress SDK injects its own launcher
  return null;
};

export default BotpressChat;