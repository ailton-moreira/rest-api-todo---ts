import { RequestHandler } from 'express'
import { Todo } from '../models/todo'

const TODO: Todo[] = []

export const createdTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text
    const newTodo = new Todo(Math.random().toString(), text)

    TODO.push(newTodo);
    res.send({
        success: true,
        message: "Created todo!",
        createdTodo: newTodo
    });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.send({
        success: true,
        todos: TODO
    })
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id;

    const updaatedText = (req.body as { text: string }).text

    const todoIndex = TODO.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error('Todo not found!');
    }

    TODO[todoIndex] = new Todo(TODO[todoIndex].id, updaatedText);
    res.send({
        sucess: true,
        updatedTodo: TODO[todoIndex]
    })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id;

    const todoIndex = TODO.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error('Todo not found!');
    }

    TODO.splice(todoIndex, 1);
    res.send({
        sucess: true,
        message: 'Todo deleted!'
    })
}