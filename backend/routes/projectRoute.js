import express from "express"
import { addProject, getProject, removeProject} from "../controllers/projectController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addProject", requireAuth, addProject)
router.get("/getProject",requireAuth, getProject)
router.delete("/removeProject/:id",requireAuth, removeProject)

export default router;