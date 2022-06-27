import db from '../../database'

const userMutation = {
    signUp: async ({ name, email, password  }: User, context: any) => {
        try {
            const user = await db.users.createUser({ name, email, password })
            return {
                data: user,
                ok: true,
                error: ''
            };
        } catch (error: any) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    },

    userLogin: async ({ email, password  }: User, context: any) => {
        try {
            const user = await db.users.userLogin({ email, password })

            console.log('user', user)
            return {
                data: user,
                ok: true,
                error: ''
            };
        } catch (error: any) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    },
    
    updateUser: async ({ id, name, email, password }: User & {id: string}, context: any) => {
        try {
            const user = await db.users.updateUser(id, { name, email, password, updatedAt: Date.now() })
            if (!user) {
                return {
                    data: null,
                    ok: false,
                    error: 'User not found'
                };
            }
            return {
                data: user,
                ok: true,
                error: ''
            };
        } catch (error: any) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    },

    deleteUser: async ({ id }: {id: string }, contex: any) => {
        try {
            const user = await db.users.deleteUser(id)
            if (!user) {
                return {
                    data: null,
                    ok: false,
                    error: 'user not found'
                };
            }
            return {
                data: user,
                ok: true,
                error: ''
            };
        }
        catch (error: any) {
            return {
                data: null,
                ok: false,
                error: error.message
            };
        }
    }
}

interface User {
    name: string
    email: string
    password: string
    updatedAt?: number
}

export default userMutation