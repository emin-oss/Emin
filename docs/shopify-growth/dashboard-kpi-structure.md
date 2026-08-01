# Dashboard-Struktur mit KPI-Definitionen (Phase 1B)

## A) Tägliche KPI-Übersicht (gesamt + nach Channel + Device)

- **Sessions** = eindeutige Besuche
- **CVR** = `Orders / Sessions`
- **ATC-Rate** = `Add-to-Cart Events / Sessions`
- **Checkout-Rate** = `Begin Checkout / Sessions`
- **Purchase-Rate** = `Purchases / Sessions`
- **AOV** = `Umsatz / Orders`
- **Umsatz** = Netto-Shop-Umsatz (Shopify-Definition)
- **CPA** = `Ad Spend / Neukunden-Bestellungen` (oder Orders, konsistent halten)
- **ROAS** = `Attributed Revenue / Ad Spend`
- **MER** = `Total Revenue / Total Marketing Spend`
- **Returning Customer Rate** = `Returning Customers / Total Customers`

## B) Funnel-Ansicht (täglich)

- Funnel: Sessions → View Item → Add to Cart → Begin Checkout → Purchase
- Step-Conversion je Stufe
- Abbruchrate je Stufe
- Segmentierung: **Channel**, **Device**, **Top-5 PDP**

## C) Datenkonsistenz-Block

- **Tracking vs Shopify Umsatz Delta %**
- Formel: `(Tracking Revenue - Shopify Revenue) / Shopify Revenue`
- Ziel: `|Delta| < 10%`
- Alarm bei Überschreitung

## D) Steuerungs-Ansicht (Entscheidungslogik)

- 7-Tage-Trend je KPI
- Ampellogik (grün/gelb/rot) pro KPI-Ziel
- Top Gewinner/Verlierer nach Channel, Device, PDP
