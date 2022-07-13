import db from '../../database'
import { CoinsInterface, ExpenseInterface } from '../../database/models/Infos/infos';

const infoMutation = {
    saveInfo: async ({  user, country, currentBudget, expense, totalCost, travelDate  }: Info, context: any) => {
        try {
            const info = await db.infos.saveInfo({  user, country, currentBudget, expense, totalCost, travelDate })
            return {
                data: info,
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
    getInfoByUserId: async (id: string ) => {
        try {
            const info = await db.infos.getInfoByUserId(id)
            return {
                data: info,
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
    updateInfo: async ({ id }: {id: string }) => {
        try {
            const info = await db.infos.getInfoById(id)
            if (!info) {
                return {
                    data: null,
                    ok: false,
                    error: 'Info not found'
                };
            }
            return {
                data: info,
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
    deleteInfo: async ({ id }: {id: string }, contex: any) => {
        try {
            const info = await db.infos.deleteInfo(id)
            if (!info) {
                return {
                    data: null,
                    ok: false,
                    error: 'info not found'
                };
            }
            return {
                data: info,
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


interface Info {
    user?: string, 
    country?: string, 
    currentBudget?: CoinsInterface,
    updatedAt?: number, 
    expense?: ExpenseInterface[],
    totalCost?: CoinsInterface, 
    travelDate?: string 
}

export default infoMutation