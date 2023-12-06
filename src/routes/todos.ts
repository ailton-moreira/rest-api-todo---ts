import { Router } from 'express';
import { createdTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();

router.post('/', createdTodo);
router.get('/', getTodos);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;