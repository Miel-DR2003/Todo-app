import mysql from 'mysql2/promise';
import { error, fail } from "@sveltejs/kit";


const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
});

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const content = data.get('content');
        const categorie = data.get('categorie');
        const endDate = data.get('endDate') || null;

        const connection = await pool.getConnection();
        try {
            await connection.query(
                'INSERT INTO todo (content, categorie, endDate, editing, checked) VALUES (?, ?, ?, ?, ?)',
                [content, categorie, endDate, false, false]
            );

            return { success: true };
        } catch (error) {
            console.error('Database error:', error);
            return fail(422, {
                description: data.get('description'),
                error: error.message
            });
        } finally {
            connection.release();
        }

    },
    /*
    UPDATE `todoapp`.`todo` SET `editing` = '1' WHERE (`todoId` = '15');
    */
    update: async ({ request }) => {
        const data = await request.formData();
        const todoId = data.get('todoId');
        const newContent = data.get('newContent');

        const connection = await pool.getConnection();
        try {
            await connection.query('UPDATE todo SET content = ? WHERE todoId = ?', [newContent, todoId]);
            return { success: true };
        } catch (err) {
            console.error('Database error:', err);
            return fail(500, { error: 'Database error' });
        } finally {
            connection.release();
        }
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const todoId = data.get('todoId');

        const connection = await pool.getConnection();
        try {
            await connection.query(
                'DELETE FROM todo WHERE todoId = ?',
                [todoId]
            );

            return { success: true };
        } catch (err) {
            console.error('Database error:', err);
            return fail(500, { error: 'Database error' });
        } finally {
            connection.release();
        }
    }
};

export const load = async () => {
    const res = await fetchAllTodo();

    return {
        todoList: res.data || [], // Ensure todoList is always an array
        error: res.error || null,  // Pass the error if any occurred
    };
};

const fetchAllTodo = async () => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM todo');
        return {
            data: rows,
        };
    } catch (err) {
        console.error('Database error:', err);
        return {
            data: [],
            error: err
        };
    } finally {
        connection.release();
    }
};

