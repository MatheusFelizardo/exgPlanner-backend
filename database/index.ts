import db  from './connect'
import UserModel from './models/Users/users'
import InfoModel from './models/Infos/infos'

import {
    getAllUsers,
    getUserById,
    getUserByToken,
    createUser,
    userLogin,
    updateUser,
    deleteUser
} from './models/Users/utils';

import {
    getInfoById,
    getInfoByUserId,
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
        getUserByToken,
        createUser,
        userLogin,
        updateUser,
        deleteUser
    },
    InfoModel,
    infos: {
        getInfoById,
        getInfoByUserId,
        saveInfo,
        updateInfo,
        deleteInfo
    }
};