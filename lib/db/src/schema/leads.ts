import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  governorate: text("governorate").notNull(),
  service: text("service").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const leadInputSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(7, "رقم الهاتف غير صحيح"),
  governorate: z.string().min(1, "المحافظة مطلوبة"),
  service: z.string().min(1, "الخدمة مطلوبة"),
  notes: z.string().optional().default(""),
});

export type InsertLead = typeof leadsTable.$inferInsert;
export type Lead = typeof leadsTable.$inferSelect;
export type LeadInput = z.infer<typeof leadInputSchema>;
