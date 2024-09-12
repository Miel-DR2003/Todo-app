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
    create: async (request) => {
        const data = await request.formData();
        const connection = await pool.getConnection();
        try {
            await connection.query(
                'INSERT INTO todo (content, categorie, endDate, editing, checked) VALUES (?, ?, ?, ?, ?)',
                [data.textInput, data.categorie, data.selectedDate, false, false]
            );

            return { success: true };
        } catch (error) {
            return fail(422, {
                description: data.get('description'),
                error: error.message
            });
        } finally {
            connection.release();
        }

    },
    delete: async (request) => {
        //todo
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

