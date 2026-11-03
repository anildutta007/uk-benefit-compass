# UK Benefit Compass & Eligibility Calculator

An interactive, responsive UK benefits eligibility calculator, statutory rulebook, and public expenditure analysis tool built with React, Vite, TypeScript, Tailwind CSS, and Leaflet OpenStreetMap.

## 🚀 Features

- **Side-by-Side Live Calculator:**
  - Standard Allowance for singles (<25 and 25+) and couples
  - Children & 2-child limit logic with pre-April 2017 grandfathered rates
  - Disabled child additions and childcare cost contributions (up to 85%)
  - Housing element (Private Rent vs Social Housing vs Homeowner) with Local Housing Allowance (LHA) cap
  - Universal Credit Work Allowance and 55% earnings taper rate
  - Personal Independence Payment (PIP) for daily living and mobility (100% non-means-tested)
  - Carer's Allowance with £151/week earnings ceiling check
  - Council Tax Reduction (CTR) including automatic 25% single-person discount

- **SIPP & Savings Rules Explorer:**
  - Capital cliff edge (>£16,000 disqualification)
  - Tariff income (£4.35/month per £250 between £6,000 and £16,000)
  - SIPP & personal pension 100% exemption under Regulation 55 while unaccessed
  - Real-time interactive sliders simulating capital impact on benefits

- **Real Interactive UK Geographic Map (Leaflet + OpenStreetMap):**
  - Slippy map with zoom and pan across all 12 UK ITL-1 regions
  - Total annual welfare spend and percentage of national total displayed directly on each territory
  - Switcher for Total Welfare Spend (£315.8bn) vs Unsettled Migrant Dispersal (118.5k)
  - Regional factsheet with population, per-capita spending, and claimant numbers

- **Unsettled Migrants & Asylum Support Breakdown:**
  - Home Office Section 95 and Section 4 support data (£5.38bn annual budget)
  - Weekly statutory allowances (ASPEN card: £49.18/wk self-catered vs £9.58/wk catered hotels)
  - No Recourse to Public Funds (NRPF) DWP legal boundary explainer

## 🎨 Color Palette

- **Cream Background:** `#F8F3E8`
- **Forest Green:** `#1F5A45`
- **Coral:** `#E9774F`
- **Butter Yellow:** `#F3DD87`
- **Pale Sage Green:** `#E2ECE5`
- **Soft Beige:** `#EFE8DA`

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Leaflet & React-Leaflet
- Lucide React

## 📦 Getting Started

```bash
cd uk-benefit-app
npm install
npm run dev
```
