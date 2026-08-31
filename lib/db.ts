import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { Pool } from "pg";

const isPostgres = Boolean(process.env.DATABASE_URL);

// Ensure the data directory exists for local SQLite use
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "diamond.db");

// Using a global cache to avoid re-opening the DB in dev (hot reload)
const globalForDb = global as unknown as { __diamondDb?: Database.Database };

export const db =
  globalForDb.__diamondDb ??
  new Database(dbPath);

if (process.env.NODE_ENV !== "production") {
  globalForDb.__diamondDb = db;
}

// Enable foreign keys / WAL for better reliability
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const getPostgresPool = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.POSTGRES_SSL === "false"
        ? false
        : { rejectUnauthorized: false },
  });
};

const ensurePostgresTable = async () => {
  if (!isPostgres) return;

  const pool = getPostgresPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      address TEXT NOT NULL,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes: string | null;
  status: string;
  created_at: string;
}

function normalizeRow(row: any): Booking {
  return {
    id: Number(row.id),
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    date: row.date,
    time: row.time,
    address: row.address,
    notes: row.notes ?? null,
    status: row.status,
    created_at: row.created_at,
  };
}

export async function createBooking(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
}): Promise<Booking> {
  if (isPostgres) {
    await ensurePostgresTable();
    const pool = getPostgresPool();
    const result = await pool.query(
      `
        INSERT INTO bookings (name, email, phone, service, date, time, address, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `,
      [
        data.name,
        data.email,
        data.phone,
        data.service,
        data.date,
        data.time,
        data.address,
        data.notes ?? "",
      ]
    );

    return normalizeRow(result.rows[0]);
  }

  const stmt = db.prepare(`
    INSERT INTO bookings (name, email, phone, service, date, time, address, notes)
    VALUES (@name, @email, @phone, @service, @date, @time, @address, @notes)
  `);
  const info = stmt.run({ notes: data.notes ?? "", ...data });
  return getBookingById(info.lastInsertRowid as number);
}

export async function getBookingById(id: number): Promise<Booking> {
  if (isPostgres) {
    await ensurePostgresTable();
    const pool = getPostgresPool();
    const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [id]);
    return normalizeRow(result.rows[0]);
  }

  return db
    .prepare("SELECT * FROM bookings WHERE id = ?")
    .get(id) as Booking;
}

export async function getAllBookings(): Promise<Booking[]> {
  if (isPostgres) {
    await ensurePostgresTable();
    const pool = getPostgresPool();
    const result = await pool.query(
      "SELECT * FROM bookings ORDER BY created_at DESC"
    );
    return result.rows.map(normalizeRow);
  }

  return db
    .prepare("SELECT * FROM bookings ORDER BY created_at DESC")
    .all() as Booking[];
}

export async function deleteBooking(id: number): Promise<boolean> {
  if (isPostgres) {
    await ensurePostgresTable();
    const pool = getPostgresPool();
    const result = await pool.query("DELETE FROM bookings WHERE id = $1", [id]);
    return Number(result.rowCount) > 0;
  }

  const info = db.prepare("DELETE FROM bookings WHERE id = ?").run(id);
  return info.changes > 0;
}

export async function updateBookingStatus(
  id: number,
  status: "pending" | "confirmed"
): Promise<boolean> {
  if (isPostgres) {
    await ensurePostgresTable();
    const pool = getPostgresPool();
    const result = await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2",
      [status, id]
    );
    return Number(result.rowCount) > 0;
  }

  const info = db
    .prepare("UPDATE bookings SET status = ? WHERE id = ?")
    .run(status, id);
  return info.changes > 0;
}
