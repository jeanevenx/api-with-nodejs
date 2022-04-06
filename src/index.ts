import express from 'express';
import usersRouter from './routes/users.routes'
import statusRoute from './routes/status.routes'
import errorHandler from './middlewares/error.handler.middleware';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(usersRouter);
app.use(statusRoute);

// Configuração de handler de erro
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listening on port: http://localhost:${port}`);
});