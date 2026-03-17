import React, { useEffect, useRef } from 'react';
import './Chatbot.css';

const injectSrc = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
const botSrc = 'https://files.bpcontent.cloud/2026/03/02/17/20260302171104-QSWM51L5.js';
const logoUrl = '/favicon.svg';

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

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;
    let idleId = null;

    const initBotpress = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          botId: 'your-bot-id',
          botName: 'Acunetix Bot',
          botAvatarUrl: logoUrl,
          avatarUrl: logoUrl,
          introMessage: 'Welcome to Acunetix! How can I help you today?',
        });
      }
    };

    const startLoading = async () => {
      if (hasStartedLoadingRef.current) return;
      hasStartedLoadingRef.current = true;

      try {
        await loadScript(injectSrc);
        await loadScript(botSrc);
        if (isMounted) {
          initBotpress();
        }
      } catch {
        // Fail silently so third-party chat issues never block the page.
      }
    };

    const interactionEvents = ['pointerdown', 'touchstart', 'keydown', 'scroll'];

    const cleanupListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, onFirstInteraction);
      });
    };

    const onFirstInteraction = () => {
      cleanupListeners();

      if (idleId !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      startLoading();
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, onFirstInteraction, { passive: true });
    });

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(() => {
        cleanupListeners();
        startLoading();
      }, { timeout: 3500 });
    } else {
      timeoutId = window.setTimeout(() => {
        cleanupListeners();
        startLoading();
      }, 2500);
    }

    return () => {
      isMounted = false;
      cleanupListeners();

      if (idleId !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
};

export default BotpressChat;