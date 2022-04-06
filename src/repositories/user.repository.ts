import db from '../db';
import { User } from '../models/user.model';
import DatabaseError  from '../models/errors/database.error.model';

class UserRepository {
   async findAllUser () : Promise<User[]> {
        const query = `
            SELECT uuid, username 
            FROM aplication_users
        `;

       const {rows} = await db.query<User>(query);
    //    const rows = result.rows;

        return rows || [];
    }

    async findUserById (uuid : string) : Promise<User> {
        try {
            const query = `
            SELECT uuid, username 
            FROM aplication_users
            WHERE uuid = $1
        `;
        const values = [uuid];
        const {rows} = await db.query<User>(query, values);
        const [user] = rows;
        return user;
            
        } catch (error) {
            console.error(error);
            throw new DatabaseError('Id error', error);
        }

    }

    async createUser (user : User) : Promise<string> {
        const script = `
            INSERT INTO aplication_users (
                username, 
                password
                ) 
            VALUES ($1, crypt($2, 'my_key')
            RETURNING uuid
        `;
        
        const values = [user.username, user.password]
        const queryResult = await db.query<{ uuid: string }>(script, values);
        const [row] = queryResult.rows;
        return row.uuid;
    }

    async update (user : User) : Promise<void> {
        const script = `
            UPDATE aplication_users 
            SET
                username = $1, 
                password = crypt($2, 'my_key')
            WHERE uuid = $3
        `;
        
        const values = [user.username, user.password, user.uuid]
        await db.query(script, values);
    }

    async removeUser(uuid: string): Promise<void>{
            const script = `
                DELETE
                FROM aplication_users
                WHERE uuid = $1
            `;
            const values = [uuid];
            await db.query(script, values);
    }


}

export default new UserRepository();
