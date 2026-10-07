import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

const fields = `
  id, type, title, organization, location, modality,
  category, description, details, link, created_at
`;

router.get("/", async (req, res, next) => {
  try {
    const { search, type, category, location } = req.query;
    const values = [];
    const conditions = [];

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`(
        title ILIKE $${values.length}
        OR organization ILIKE $${values.length}
        OR description ILIKE $${values.length}
        OR category ILIKE $${values.length}
      )`);
    }

    if (type && type !== "Todos") {
      values.push(type);
      conditions.push(`type = $${values.length}`);
    }

    if (category && category !== "Todas") {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (location && location !== "Todas") {
      values.push(location);
      conditions.push(`location = $${values.length}`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const result = await pool.query(
      `SELECT ${fields} FROM opportunities ${where} ORDER BY created_at DESC`,
      values
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT ${fields} FROM opportunities WHERE id = $1`,
      [req.params.id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "Oportunidade não encontrada." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      type, title, organization, location, modality,
      category, description, details, link
    } = req.body;

    if (!type || !title || !organization || !location || !modality ||
        !category || !description || !details || !link) {
      return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
    }

    const result = await pool.query(
      `INSERT INTO opportunities
       (type, title, organization, location, modality, category, description, details, link)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING ${fields}`,
      [type, title, organization, location, modality, category, description, details, link]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {
      type, title, organization, location, modality,
      category, description, details, link
    } = req.body;

    const result = await pool.query(
      `UPDATE opportunities
       SET type=$1, title=$2, organization=$3, location=$4, modality=$5,
           category=$6, description=$7, details=$8, link=$9, updated_at=NOW()
       WHERE id=$10
       RETURNING ${fields}`,
      [type, title, organization, location, modality, category, description, details, link, req.params.id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "Oportunidade não encontrada." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM opportunities WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "Oportunidade não encontrada." });
    }

    res.json({ message: "Oportunidade excluída com sucesso." });
  } catch (error) {
    next(error);
  }
});

export default router;
