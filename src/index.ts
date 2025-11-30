import { Blizzard, logger } from "blizzardts";

const app = Blizzard();
const port = 3000;

app.use(async (c, next) => {
  const start = performance.now();
  const res = await next();
  const end = performance.now();
  
  // Capture status from response if available
  const status = res instanceof Response ? res.status : 500;
  
  c.utils.logger.request(c.req.method, c.req.path, status, end - start);
  
  return res;
});

app.get("/", (c) => {
  return c.json({
    message: "Welcome to BlizzardTS Server",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/users/:id", (c) => {
  const { id } = c.req.params;
  return c.json({
    id,
    name: `User ${id}`,
    role: "member",
  });
});

app.post("/data", async (c) => {
  const body = await c.req.json();
  return c.json({
    received: true,
    data: body,
    id: c.utils.uid(),
  });
});

logger.startup({ port });

export default {
  port,
  fetch: app.fetch,
};
