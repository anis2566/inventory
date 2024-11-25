import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { setCookie } from "hono/cookie";
import { AUTH_COOKIE_NAME } from "@/constant";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const adminClient = await createAdminClient();

    const session = await adminClient.account.createEmailPasswordSession(
      email,
      password
    );

    setCookie(c, AUTH_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ message: "Login Success" });
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { email, password, name } = c.req.valid("json");

    const adminClient = await createAdminClient();

    await adminClient.account.create(ID.unique(), email, password, name);

    const session = await adminClient.account.createEmailPasswordSession(
      email,
      password
    );

    setCookie(c, AUTH_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ message: "Registration Success" });
  });

export default app;
