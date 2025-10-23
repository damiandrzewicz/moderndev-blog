<template>
  <transition name="fade">
    <div v-if="visible" class="cookie-banner">
      <div class="cookie-content">
        <strong>We use cookies.</strong>
        <p>
          We use cookies to improve your experience and analyze traffic.
          See our <a href="/privacy/" class="link">Privacy & Cookies</a>.
        </p>
      </div>
      <div class="cookie-actions">
        <button class="btn primary" @click="accept">Accept</button>
        <button class="btn" @click="decline">Decline</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'cookie-consent-v1'
const visible = ref(false)

function loadGtagOnce() {
  if (typeof window === 'undefined') return
  const id = (window as any).__GA_MEASUREMENT_ID__
  if (!id) return
  if ((window as any).__gtagLoaded) return

  // inject gtag.js and configure
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  script.onload = () => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).gtag = (window as any).gtag || function(...args: any[]){ (window as any).dataLayer.push(args) }
    ;(window as any).gtag('js', new Date())
    ;(window as any).gtag('config', id)
    ;(window as any).__gtagLoaded = true
  }
  document.head.appendChild(script)
}

function setConsent(granted: boolean) {
  try { localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied') } catch {}
  // Update Consent Mode v2 and optionally load GA
  if (typeof window !== 'undefined') {
    const id = (window as any).__GA_MEASUREMENT_ID__ // we'll set this in config.ts
    if (id) {
      if ((window as any).gtag) {
        (window as any).gtag('consent','update',{
          ad_user_data: granted ? 'granted' : 'denied',
          ad_personalization: granted ? 'granted' : 'denied',
          ad_storage: granted ? 'granted' : 'denied',
          analytics_storage: granted ? 'granted' : 'denied',
        })
      } else {
        // queue via dataLayer if gtag not loaded yet
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).gtag = (window as any).gtag || function(...args: any[]){ (window as any).dataLayer.push(args) }
        ;(window as any).gtag('consent','update',{
          ad_user_data: granted ? 'granted' : 'denied',
          ad_personalization: granted ? 'granted' : 'denied',
          ad_storage: granted ? 'granted' : 'denied',
          analytics_storage: granted ? 'granted' : 'denied',
        })
      }
      if (granted) loadGtagOnce()
    }
  }
}

function accept() { setConsent(true); visible.value = false }
function decline(){ setConsent(false); visible.value = false }

onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'granted' || saved === 'denied') {
      setConsent(saved === 'granted')
      visible.value = false
    } else {
      visible.value = true
    }
  } catch { visible.value = true }
})
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  right: 1rem;
  left: auto;
  bottom: calc(1rem + 4rem); /* keep above footer to avoid blocking links */
  z-index: 9999;
  display: flex; gap: .75rem; align-items: center; justify-content: space-between;
  padding: .9rem 1rem;
  border-radius: .75rem;
  background: var(--vp-c-bg, #111);
  color: var(--vp-c-text, #eee);
  box-shadow: 0 10px 30px rgba(0,0,0,.25);
  max-width: 48rem;
}
.cookie-content { max-width: 48rem; }
.cookie-content p { margin: .25rem 0 0 0; opacity: .9 }
.link { text-decoration: underline }
.cookie-actions { display: flex; gap: .5rem; }
.btn { padding: .5rem .9rem; border-radius: .5rem; border: 1px solid #666; background: transparent; color: inherit; }
.btn.primary { border-color: transparent; background: var(--vp-c-brand, #4b9cff); color: #fff; }
.fade-enter-active, .fade-leave-active { transition: opacity .18s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
@media (max-width: 640px){
  .cookie-banner{left: 1rem; right: 1rem; bottom: calc(1rem + 4rem); flex-direction:column; align-items:flex-start}
  .cookie-actions{align-self:flex-end}
}
</style>
