import { Blizzard, cors, logger, serveStatic, loggerUtils } from "blizzardts";

const app = Blizzard({
  root: "./public"
});
const port = 3000;

// Use the new built-in logger middleware
app.use(logger());

app.use(cors());
app.use(serveStatic("./public"));

app.get("/", (c) => {
  return c.render("index.blizzard")
});

app.get("/layout", (c) => c.render("page.blizzard"));
app.get("/api", (c) => {
  return c.json({
    message: "Welcome to BlizzardTS API",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/users/:id", (c) => {
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

loggerUtils.startup({ port, version: "0.1.3" });

export default {
  port,
  fetch: app.fetch,
};
