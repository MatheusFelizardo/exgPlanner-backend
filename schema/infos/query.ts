import db from '../../database'

const infoQuery = {
    info: async ({id}: { id: string }, context: any) => {
        return await db.infos.getInfoById(id)
    }
};

export default infoQuery