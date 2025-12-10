# Mini Energy Management Dashboard — Frontend Assignment

Built with: React + Vite + Tailwind + Redux Toolkit + ECharts + MSW (mock API)

## Features implemented
- Real-time Live Chart for Active/Reactive power using ECharts
  - Polls `/api/power/live` every 60s
  - API returns 20 points per request
  - Rolling window of 100 points
  - Start / Stop controls
- Alarms / Events table
  - Server-side searchable (debounced 400ms)
  - Favorites toggle and Favorites-only view
- Site Details page
  - Alarm Summary
  - Energy Report 1.0 stacked bar (Solar vs Grid)
  - Maintenance Ticket Drawer (simulated async submission)
- Redux Toolkit slices for `power`, `alarms`, `site`, `maintenance`
- MSW mock API providing `/api/power/live`, `/api/alarms`, `/api/site/:id`

## Quick start
1. Install:
   ```bash
   npm install
2. Start dev server:
   ```bash
   npm run dev

MSW will run in the browser during dev and provide mocked endpoints.

3. Build:
   ```bash
    npm run build
    npm run preview

Deployment

The project is Vercel friendly. Connect repository and deploy.

Ensure production does not import msw worker (you can conditionally start worker only in dev).

Notes / Implementation details

usePolling hook exposes startPolling, stopPolling, and ensures interval is cleared immediately on stop.

useDebounce hook returns a debounced value after provided delay (default 400ms).

Mock data is generated via MSW in src/mocks/handlers.js.

The power slice maintains chartData and currentPower. appendPoints enforces the 100-point rolling window.

---

# Final notes & recommended next steps
- This code is ready to paste into a Vite project. File structure is consistent with `src/*` and `index.html`.
- MSW provides the required mock endpoints; the power endpoint produces exactly 20 points per call, and the slice appends them and keeps at most 100.
- `usePolling` calls the API immediately once Start is pressed (so users see immediate data) and then every 60s. `stopPolling()` clears interval immediately.
- Debounced search is server-side (the front-end calls `/api/alarms?search=` after debounce).
- Ticket submission is simulated with a `setTimeout` inside the `submitTicket` thunk and stored in `maintenanceSlice`.

---