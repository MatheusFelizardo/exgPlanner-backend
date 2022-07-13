import { buildSchema } from 'graphql';

const userSchema = `
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        token: String
    }

    type UserToken {
        _id: ID!
        name: String
        email: String
        token: String
    }

    type UserTokenResponse {
        data: UserToken
        error: String
        ok: Boolean
    }

    type Users {
        users: [User]
    }
    type UserResponse {
        data: User
        error: String
        ok: Boolean
    }
`;

const infoSchema = `

    type CoinSchema {
        value: String
        coin: String
    }

    type ExpenseInterface {
        type: String
        description: String
        value: String
    }


    type Info {
        _id: ID!
        country: String, 
        currentBudget: CoinSchema,
        expense: [ExpenseInterface],
        totalCost: CoinSchema,
        travelDate: String
    }

    type InfoResponse {
        data: Info
        error: String
        ok: Boolean
    }
`

const commons = `
    type Query {
        info(id: ID!): Info
        users(limit: Int): [User]
        user(id: ID!): User
    }

    input CoinSchemaInput {
        value: String
        coin: String
    }

    input ExpenseI {
        type: String
        description: String
        value: String
    }

    type Mutation {
        signUp(name: String!, email: String!, password: String!, created_at: Int, updated_at: Int ): UserResponse
        userLogin(email: String!, password: String!): UserTokenResponse
        updateUser(id: ID!, name: String, email: String, password: String,  updated_at: Int): UserResponse
        deleteUser(id: ID!): UserResponse
        getUserByToken(token: String): UserResponse
        saveInfo(user: String, country: String, currentBudget: CoinSchemaInput, expense: [ExpenseI], totalCost: CoinSchemaInput, travelDate: String): InfoResponse
        getInfoByUserId(id: String): InfoResponse
        updateInfo(id: ID!, country: String, currentBudget: String, expense: [ExpenseI], totalCost: String, travelDate: String): InfoResponse
        deleteInfo(id: ID!): InfoResponse
    }
`

const schema = buildSchema(` ${commons} ${userSchema} ${infoSchema}`)

export default schema;