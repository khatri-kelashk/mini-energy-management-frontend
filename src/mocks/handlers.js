import { rest } from "msw";

const makePowerPoints = () => {
  // generate 20 points with ts and sin-based values
  const now = Date.now();
  return Array.from({ length: 20 }).map((_, i) => {
    const ts = now + i * 1000;
    const phase = (now / 1000 + i) / 10;
    const active = +(50 + 20 * Math.sin(phase) + Math.random() * 6).toFixed(2);
    const reactive = +(20 + 10 * Math.cos(phase) + Math.random() * 4).toFixed(2);
    return { ts, active, reactive };
  });
};

// create sample alarm list
const sampleAlarms = Array.from({ length: 45 }).map((_, i) => {
  const sev = ["Minor", "Major", "Critical", "Site Down"][Math.floor(Math.random() * 4)];
  return {
    id: `${1000 + i}`,
    code: `A-${1000 + i}`,
    description: `Event description ${i}`,
    site: `Site ${1 + (i % 6)}`,
    severity: sev,
    time: new Date(Date.now() - i * 60000).toISOString(),
    tags: ["power", "voltage"].slice(0, 1 + (i % 2))
  };
});

export const handlers = [
  rest.get("/api/power/live", (req, res, ctx) => {
    const points = makePowerPoints();
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({ points })
    );
  }),

  rest.get("/api/alarms", (req, res, ctx) => {
    const search = req.url.searchParams.get("search") || "";
    const filtered = sampleAlarms.filter((a) => {
      const s = search.trim().toLowerCase();
      if (!s) return true;
      return (
        a.code.toLowerCase().includes(s) ||
        a.description.toLowerCase().includes(s) ||
        a.site.toLowerCase().includes(s)
      );
    });
    // simulate slight network delay
    return res(ctx.delay(300), ctx.status(200), ctx.json(filtered));
  }),

  rest.get("/api/site/:id", (req, res, ctx) => {
    const siteId = req.params.id;
    // create fake energy stats for last 7 days
    const days = 7;
    const dates = Array.from({ length: days }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      return d.toISOString().slice(0, 10);
    });
    const solar = dates.map(() => Math.round(100 + Math.random() * 200));
    const grid = dates.map(() => Math.round(200 + Math.random() * 300));
    const siteInfo = {
      id: siteId,
      name: `Site ${siteId}`,
      location: "Karachi, PK",
    };
    const payload = {
      siteInfo,
      mode: ["Grid Following", "Microgrid", "Standalone"][
        Math.floor(Math.random() * 3)
      ],
      energyStats: { dates, solar, grid },
      alarmSummary: {
        down: Math.floor(Math.random() * 2),
        critical: Math.floor(Math.random() * 5),
        major: Math.floor(Math.random() * 7),
        minor: Math.floor(Math.random() * 10),
      },
    };
    return res(ctx.delay(300), ctx.status(200), ctx.json(payload));
  }),
];
