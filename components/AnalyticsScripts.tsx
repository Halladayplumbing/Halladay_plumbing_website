import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

// Halladay Plumbing's live GA4 property. This is a public measurement ID
// (it ships in every page's HTML/network requests by design — GA4 IDs
// are not secrets), so it's safe to default to here rather than require
// every deploy target to remember to set an env var. Override via
// NEXT_PUBLIC_GA4_ID for a different property (e.g. a staging GA4
// property) without touching code.
const DEFAULT_GA4_ID = "G-CSMNSQBYHM";

// Halladay's GHL (GoHighLevel) sub-account External Tracking script. Like
// the GA4 ID above, this tracking ID is meant to ship in public page HTML
// (GHL's own docs have sites embed it client-side) — not a secret, so it's
// safe to default here too. It watches for form submissions site-wide and
// creates/updates GHL contacts; it does not replace or intercept the
// site's own /api/lead submission (see components/forms/ContactForm.tsx
// and QualificationForm.tsx). Override via NEXT_PUBLIC_GHL_TRACKING_ID for
// a different sub-account (e.g. a staging GHL location) without touching
// code.
const GHL_SCRIPT_SRC = "https://agency.illussomedia.com/js/external-tracking.js";
const DEFAULT_GHL_TRACKING_ID = "tk_0ea34805091c40c69dc3663b37ee62c3";

// Loads GA4 sitewide via Next.js's own official `@next/third-parties`
// integration — the framework-recommended way to install a Google tag in
// an App Router site. It also handles SPA route-change page_view events
// automatically (App Router navigations don't trigger a full page load,
// so gtag's own auto pageview only fires once without this).
//
// GTM and the Meta Pixel still only load when their env vars are set —
// nothing else is installed unless explicitly configured. See
// .env.example.
export function AnalyticsScripts() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  // Falls back to the live GA4 ID automatically in a production build
  // (so no deploy target needs an env var set to satisfy "GA4 must load
  // sitewide"), but NOT in local development, so `npm run dev` doesn't
  // send test traffic into the real property. Set NEXT_PUBLIC_GA4_ID
  // locally to opt into testing the real tag during development.
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID || (process.env.NODE_ENV === "production" ? DEFAULT_GA4_ID : undefined);
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const ghlTrackingId =
    process.env.NEXT_PUBLIC_GHL_TRACKING_ID || (process.env.NODE_ENV === "production" ? DEFAULT_GHL_TRACKING_ID : undefined);

  return (
    <>
      {ghlTrackingId && (
        <Script
          id="ghl-external-tracking"
          src={GHL_SCRIPT_SRC}
          data-tracking-id={ghlTrackingId}
          strategy="afterInteractive"
        />
      )}

      {gtmId && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {ga4Id && <GoogleAnalytics gaId={ga4Id} />}

      {metaPixelId && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  );
}
