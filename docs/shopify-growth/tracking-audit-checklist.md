# Tracking-Audit-Checkliste (Phase 1A)

## A) GA4 E-Commerce Events (Pflicht)

- [ ] `view_item` feuert auf jeder PDP (mobile + desktop, 1x pro View)
- [ ] `add_to_cart` feuert bei jedem ATC-Klick (inkl. Variant/Qty)
- [ ] `begin_checkout` feuert beim Checkout-Start
- [ ] `purchase` feuert nur nach erfolgreicher Bestellung
- [ ] Event-Parameter vollständig:
  - [ ] `item_id`
  - [ ] `item_name`
  - [ ] `price`
  - [ ] `quantity`
  - [ ] `currency`
  - [ ] `value`
  - [ ] `transaction_id` (bei purchase)

## B) Meta Pixel + Conversions API

- [ ] Pixel installiert und Events aktiv:
  - [ ] `ViewContent`
  - [ ] `AddToCart`
  - [ ] `InitiateCheckout`
  - [ ] `Purchase`
- [ ] CAPI aktiv (serverseitig) mit denselben Kern-Events
- [ ] Event Match Quality geprüft (insb. Purchase)
- [ ] Deduplication korrekt (`event_id` Pixel/CAPI konsistent)

## C) Attribution & UTM-Standard

- [ ] Einheitliches UTM-Schema verpflichtend:
  - [ ] `utm_source`
  - [ ] `utm_medium`
  - [ ] `utm_campaign`
  - [ ] `utm_content`
- [ ] Naming-Konvention dokumentiert (z. B. `meta_paid`, `google_cpc`, `retargeting_14d`)
- [ ] Alle aktiven Kampagnen/Ads auf korrekte UTM geprüft

## D) Datenqualität & QA

- [ ] Mobile QA: iOS + Android
- [ ] Desktop QA: Chrome + Safari
- [ ] Testkäufe durchgeführt (End-to-End Funnel)
- [ ] Shopify Umsatz vs. Tracking-Abweichung täglich gemessen (Ziel: `< 10%`)
- [ ] Kanal-/Device-Breakdown plausibel (keine Unknown-Anomalien)
