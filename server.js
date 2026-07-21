import express from 'express'
import cors from 'cors'
import pool from './db.js';

const app = express();

app.use(cors());
app.use(express.json());


// let todos = [
//    {id: 1, text: 'Express 배우기'},
//    {id: 2, text: 'API 만들기'}
// ];

// 목록 조회
app.get("/todos", async (req, res) => {
    const result = await pool.query('select * from todos order by 1 desc')
    res.json(result.rows);
});

// 상세조회
// app.get('/todos/:id', (req, res) => {
//     const todo = todos.find((t) => t.id === Number(req.params/id));

//     if (!todo) {
//         return res.status(404).json({ message: "없는 할 일입니다."});
//     }

//     res.json(todo)
// });

// 새 할일 추가
app.post("/todos", async (req, res) => {
    const result = await pool.query('insert into todos (text) values ($1) returning *'
        , [req.body.text]);
    res.status(201).json(result.rows[0]);
});

// 할일 수정
// app.put('/todos/:id', (req, res) => {
//     const todo = todos.find((t) => t.id === Number(req.params.id));

//     if (!todo) {
//         return res.status(404).json({message: "없는 할 일입니다."});
//     }
//     todo.text = req.body.text;
//     res.json(todo);

// });

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM todos WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "해당 일정이 없습니다."
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "삭제 실패"
        });
    }
});

// // 할일 삭제
// app.delete("/todos/:id", (req, res) => {
//     todos = todos.filter((t) => t.id !== Number(req.params.id))
//     res.status(204).send;
// });



app.listen(3000, ()=> {
    console.log('서버 실행중: http://localhost:3000');
})