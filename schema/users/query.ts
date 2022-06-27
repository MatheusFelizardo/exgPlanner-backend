import db from '../../database'

const userQuery = {
    users: async ({limit}: { limit: number }, context: any) => {
        return await db.users.getAllUsers(limit)
    },
    user: async ({id}: { id: string }, context: any) => {
        return await db.users.getUserById(id)
    }
};

export default userQuery