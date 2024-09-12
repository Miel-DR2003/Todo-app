import mysql from 'mysql2/promise';
import { error, fail } from "@sveltejs/kit";

export const createTodo = async (todo) => {
    return server.actions.create(todo);
}

export const deleteTodo = async (todo) => {
    return server.actions.delete(todo);
}




