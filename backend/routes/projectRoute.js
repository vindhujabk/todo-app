import express from "express"
import { addProject, getProject, removeProject,updateProject,getProjectById} from "../controllers/projectController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addProject", requireAuth, addProject)
router.get("/getProject",requireAuth, getProject)
router.get("/getProject/:id",requireAuth, getProjectById)
router.delete("/removeProject/:id",requireAuth, removeProject)
router.put("/updateProject/:id", requireAuth, updateProject);


export default router;