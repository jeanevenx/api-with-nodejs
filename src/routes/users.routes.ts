import { Router, Request, Response, NextFunction } from "express";
import StatusCodes from 'http-status-codes'
import UserRepository from '../repositories/user.repository'
// import DatabaseError from '../models/errors/database.error.model'


// GET /users
// GET /users/:uuid
// POST /users
// PUT /users/:uuid
// DELETE /users/:uuid

const usersRouter = Router();

// Find users / read

usersRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserRepository.findAllUser();
    res.status(StatusCodes.OK).send(users);
});

usersRouter.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const user = await UserRepository.findUserById(uuid);
        res.status(StatusCodes.OK).send(user);

    }catch(e){
        next(e);
        
    }
});


// Create a user
usersRouter.post('/users/', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid =  await UserRepository.createUser(newUser)
    res.status(StatusCodes.CREATED).send(uuid)
});

// Update users
usersRouter.put('/users/:uuid/', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUsers = req.body
    modifiedUsers.uuid = uuid;

    await UserRepository.update(modifiedUsers);
    res.status(StatusCodes.OK).send();
});

// delete users 
usersRouter.delete('/users/:uuid/', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await UserRepository.removeUser(uuid)
    res.sendStatus(StatusCodes.OK);
});
export default usersRouter;