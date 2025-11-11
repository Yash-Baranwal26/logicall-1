import { PrismaClient } from "@prisma/client";
import { EntryCreateSchema, EntryUpdateSchema } from "../validations/entry.schema.js";

const prisma = new PrismaClient();
const routes = {}


routes.addEntry = async (req, res) => {
  try {
    const parsed = EntryCreateSchema.parse(req.body);

    const entry = await prisma.entry.create({
      data: {
        title: parsed.title,
        type: parsed.type === 'Movie' ? 'MOVIE' : 'TV_SHOW',
        director: parsed.director,
        budget: parsed.budget || 0,
        location: parsed.location,
        duration: parseInt(parsed.duration),
        year: parseInt(parsed.yearOrTime),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Entry created successfully",
      data: entry,
    });

  } catch (error) {
    if (error.name === "ZodError" && Array.isArray(error.errors)) {
      const formattedErrors = {};
      error.errors.forEach((err) => {
        const field = err.path[0];
        formattedErrors[field] = err.message;
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    console.error("Error ", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};




routes.listEntries = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [entries, total] = await Promise.all([
      prisma.entry.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.entry.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalRecords: total,
      pageSize: limit,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
      data: entries,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


routes.editEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const parsed = EntryUpdateSchema.parse(req.body);

    const existing = await prisma.entry.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    const updated = await prisma.entry.update({
      where: { id },
      data: {
        ...parsed,
        ...(parsed.type && { type: parsed.type === 'Movie' ? 'MOVIE' : 'TV_SHOW' }),
        ...(parsed.duration && { duration: parseInt(parsed.duration) }),
        ...(parsed.yearOrTime && { year: parseInt(parsed.yearOrTime) }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      data: updated,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, message: error.errors });
    }
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


routes.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.entry.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    await prisma.entry.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: "Entry deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

routes.searchEntries = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide a search title",
      });
    }

    const entries = await prisma.entry.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive", 
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (entries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No entries found for this title",
      });
    }

    return res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export default routes;