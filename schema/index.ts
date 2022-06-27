import apiSchema from './schema'
import userQuery from './users/query'
import userMutation from './users/mutation'

import infoQuery from './infos/query'
import infoMutation from './infos/mutation'

export const resolver = {
    ...userQuery, ...userMutation, ...infoQuery, ...infoMutation
};

export const schema = apiSchema;