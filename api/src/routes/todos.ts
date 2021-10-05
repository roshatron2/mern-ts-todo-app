import { Router } from "express";
import { getTodos, updateTodo, deleteTodo, addTodo } from "../controllers/todos";
import { protect } from "../middlewares/auth";

const router: Router = Router();

router.route("/todos").get(protect, getTodos);
router.route("/add-todo").post(protect, addTodo);
router.route("/edit-todo/:id").put(protect, updateTodo);
router.route("/delete-todo/:id").delete(protect, deleteTodo);

export default router;
