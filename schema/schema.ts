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
    type Info {
        _id: ID!
        country: String, 
        currentBudget: String,
        expense: [String],
        missing: String,
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
    type Mutation {
        signUp(name: String!, email: String!, password: String!, created_at: Int, updated_at: Int ): UserResponse
        userLogin(email: String!, password: String!): UserTokenResponse
        updateUser(id: ID!, name: String, email: String, password: String,  updated_at: Int): UserResponse
        deleteUser(id: ID!): UserResponse
        getUserByToken(token: String): UserResponse
        saveInfo(user: String, country: String, currentBudget: String, expense: [String], missing: String, travelDate: String): InfoResponse
        updateInfo(id: ID!, country: String, currentBudget: String, expense: [String], missing: String, travelDate: String): InfoResponse
        deleteInfo(id: ID!): InfoResponse
    }
`

const schema = buildSchema(` ${commons} ${userSchema} ${infoSchema}`)

export default schema;