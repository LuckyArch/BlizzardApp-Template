import { Blizzard, Context, cors, logger, serveStatic, loggerUtils } from "blizzardts";

const app = Blizzard({
  root: "./public"
});
const port = 3000;

// Use the new built-in logger middleware
app.use(logger());

app.use(cors());
app.use(serveStatic("./public"));

app.get("/", (c: Context) => {
  return c.render("index.blizzard")
});

app.get("/layout", (c: Context) => c.render("page.blizzard"));
app.get("/api", (c: Context) => {
  return c.json({
    message: "Welcome to BlizzardTS API",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/users/:id", (c: Context) => {
  const { id } = c.req.params;
  return c.json({
    id,
    name: `User ${id}`,
    role: "member",
  });
});

app.post("/data", async (c: Context) => {
  const body = await c.req.json();
  return c.json({
    received: true,
    data: body,
    id: c.utils.uid(),
  });
});

// Use logger instance for startup message
loggerUtils.startup({ port, version: "0.1.9" });

export default {
  port,
  fetch: app.fetch,
};
