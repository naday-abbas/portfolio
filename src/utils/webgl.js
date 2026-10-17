/**
 * WebGL and Hardware Capability Detection Utility
 * Safely determines if WebGL / WebGL2 can be instantiated without throwing errors
 * and respects user accessibility preferences (prefers-reduced-motion).
 */

let _isWebGLSupported = null;
let _lastFailedCheckTime = 0;

export function isWebGLSupported(force = false) {
  if (typeof window === "undefined") return false;

  // If already confirmed supported and not forced, return cached true
  if (!force && _isWebGLSupported === true) return true;

  // If previous check failed, allow re-checking after 2 seconds to recover from transient GPU hangs/driver resets
  const now = Date.now();
  if (!force && _isWebGLSupported === false && now - _lastFailedCheckTime < 2000) {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    const supported = Boolean(gl);
    if (supported) {
      _isWebGLSupported = true;
      try {
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
      } catch {}
      return true;
    } else {
      _isWebGLSupported = false;
      _lastFailedCheckTime = now;
      return false;
    }
  } catch (err) {
    _isWebGLSupported = false;
    _lastFailedCheckTime = now;
    return false;
  }
}

export function resetWebGLSupportCache() {
  _isWebGLSupported = null;
  _lastFailedCheckTime = 0;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function isModestDevice() {
  if (typeof window === "undefined") return false;
  try {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    return cores <= 2 || memory <= 2;
  } catch {
    return false;
  }
}
