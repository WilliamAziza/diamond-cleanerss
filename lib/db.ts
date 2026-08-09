import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Ensure the data directory exists
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

// Create bookings table if it doesn't exist
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

export function createBooking(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
}): Booking {
  const stmt = db.prepare(`
    INSERT INTO bookings (name, email, phone, service, date, time, address, notes)
    VALUES (@name, @email, @phone, @service, @date, @time, @address, @notes)
  `);
const info = stmt.run({ notes: data.notes ?? "", ...data });
  return getBookingById(info.lastInsertRowid as number);
}

export function getBookingById(id: number): Booking {
  return db
    .prepare("SELECT * FROM bookings WHERE id = ?")
    .get(id) as Booking;
}

export function getAllBookings(): Booking[] {
  return db
    .prepare("SELECT * FROM bookings ORDER BY created_at DESC")
    .all() as Booking[];
}

export function deleteBooking(id: number): boolean {
  const info = db.prepare("DELETE FROM bookings WHERE id = ?").run(id);
  return info.changes > 0;
}

export function updateBookingStatus(
  id: number,
  status: "pending" | "confirmed"
): boolean {
  const info = db
    .prepare("UPDATE bookings SET status = ? WHERE id = ?")
    .run(status, id);
  return info.changes > 0;
}
