/* game-driver.js — neutral offline driver (Pawn Duel build)
 * The game (ImpactJS/MarketJS template) injects the Poki SDK at runtime
 * (script#poki-jssdk → game-cdn.poki.com). To keep the build fully offline:
 *   1. we pre-create a stub <script id="poki-jssdk"> so initSdk() takes the
 *      "already present" branch, and
 *   2. we define window.PokiSDK so onSdkReady() fires immediately with a
 *      neutral SDK surface (no network, no ads).
 * Also installs a global crash-recovery hook (single guarded reload).
 * Must be loaded FIRST in <head>, before game.js.
 */
(function () {
  'use strict';

  function noop() {}
  function resolvedPromise(value) { return Promise.resolve(value); }

  window.PokiSDK = {
    init: function () { return resolvedPromise(); },
    setDebug: noop,
    gameLoadingStart: noop,
    gameLoadingProgress: noop,
    gameLoadingFinished: noop,
    gameplayStart: noop,
    gameplayStop: noop,
    happyTime: noop,
    commercialBreak: function () { return resolvedPromise(); },
    rewardedBreak: function () { return resolvedPromise(false); },
    captureError: noop,
    shareableURL: function () { return resolvedPromise(''); },
    getURLParam: function () { return null; },
    log: { event: noop }
  };

  // Pre-create the marker script tag so the game's initSdk() never injects
  // the remote SDK loader.
  var stub = document.createElement('script');
  stub.id = 'poki-jssdk';
  stub.text = '/* offline stub: real PokiSDK provided by game-driver.js */';
  (document.head || document.documentElement).appendChild(stub);

  // Global recovery hook: single reload on fatal error, 30 s cooldown.
  var lastReload = 0;
  window.addEventListener('error', function () {
    var now = Date.now();
    if (now - lastReload < 30000) return;
    if (window.__driverReloaded) return;
    window.__driverReloaded = true;
    lastReload = now;
    setTimeout(function () { location.reload(); }, 500);
  });
})();
