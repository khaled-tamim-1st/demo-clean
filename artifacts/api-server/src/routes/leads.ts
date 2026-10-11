import { Router, type IRouter, type Request, type Response } from "express";
import { db, leadsTable, leadInputSchema, type Lead } from "@workspace/db";

const router: IRouter = Router();

// Fallback in-memory store for environments where PostgreSQL is not yet attached
const inMemoryLeads: Lead[] = [];
let nextId = 1;

router.post("/contact", async (req: Request, res: Response) => {
  const parseResult = leadInputSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: "بيانات الطلب غير مكتملة أو غير صحيحة",
      errors: parseResult.error.flatten().fieldErrors,
    });
    return;
  }

  const { name, phone, governorate, service, notes } = parseResult.data;

  try {
    if (db) {
      const inserted = await db
        .insert(leadsTable)
        .values({
          name,
          phone,
          governorate,
          service,
          notes: notes || null,
        })
        .returning();

      res.status(201).json({
        success: true,
        message: "تم استلام طلب المعاينة بنجاح، سيتواصل معك فريق ديمو كلين خلال 15 دقيقة.",
        data: inserted[0],
      });
      return;
    }
  } catch (error) {
    // If database insertion fails, log and gracefully fall back to in-memory store
    console.error("Database write error, using fallback store:", error);
  }

  const fallbackLead: Lead = {
    id: nextId++,
    name,
    phone,
    governorate,
    service,
    notes: notes || null,
    status: "new",
    createdAt: new Date(),
  };

  inMemoryLeads.unshift(fallbackLead);

  res.status(201).json({
    success: true,
    message: "تم استلام طلب المعاينة بنجاح، سيتواصل معك فريق ديمو كلين خلال 15 دقيقة.",
    data: fallbackLead,
  });
});

// Alias for REST convention
router.post("/leads", (req: Request, res: Response) => {
  // Delegate to same handler logic
  (router as any).handle(Object.assign({}, req, { url: "/contact" }), res);
});

router.get("/leads", async (_req: Request, res: Response) => {
  try {
    if (db) {
      const allLeads = await db.select().from(leadsTable);
      res.json({ success: true, data: allLeads });
      return;
    }
  } catch (err) {
    console.error("Database query failed:", err);
  }

  res.json({ success: true, data: inMemoryLeads });
});

export default router;
