import { Elysia } from "elysia";
import { invoicePlugin } from "./invoice";

const app = new Elysia()
  .use(invoicePlugin)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
