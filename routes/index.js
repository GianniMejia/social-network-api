import express from "express";
import apiRoutes from "./api/index.js";

export const router = express.Router();

import { router as userRoutes } from "./user-routes.js";
import { router as thoughtRoutes } from "./thought-routes.js";

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

const router = express.Router();
router.use("/api", apiRoutes);

export default router;
