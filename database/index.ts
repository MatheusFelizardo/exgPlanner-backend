import db  from './connect'
import UserModel from './models/Users/users'
import InfoModel from './models/Infos/infos'

import {
    getAllUsers,
    getUserById,
    createUser,
    userLogin,
    updateUser,
    deleteUser
} from './models/Users/utils';

import {
    getInfoById,
    saveInfo,
    updateInfo,
    deleteInfo
} from './models/Infos/utils';

export default {
    db,
    UserModel,
    users: {
        getAllUsers,
        getUserById,
        createUser,
        userLogin,
        updateUser,
        deleteUser
    },
    InfoModel,
    infos: {
        getInfoById,
        saveInfo,
        updateInfo,
        deleteInfo
    }
};