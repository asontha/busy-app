import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/", async (
  { params, response }: { params: { uuid: string }; response: any },
) => {
  response.status = 200;
  response.body = "Hello world"
});

export default router;
