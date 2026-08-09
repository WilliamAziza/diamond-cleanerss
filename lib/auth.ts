import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE = "diamond_admin_session";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecret(): string {
  return process.env.ADMIN_SECRET || "diamond-super-secret-key-change-me";
}

function getAdminUser(): string {
  return process.env.ADMIN_USER || "admin";
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "diamond123";
}

export function verifyCredentials(username: string, password: string): boolean {
  const user = getAdminUser();
  const pass = getAdminPassword();
  return username === user && password === pass;
}

function createToken(): string {
  const payload = `${Date.now()}:${crypto.randomBytes(16).toString("hex")}`;
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

function verifyToken(token: string): boolean {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  if (signature !== expected) return false;

  const timestamp = parseInt(payload.split(":")[0], 10);
  if (isNaN(timestamp)) return false;
  const age = Math.floor(Date.now() / 1000) - Math.floor(timestamp / 1000);
  return age < SESSION_TTL;
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifyToken(token);
}
