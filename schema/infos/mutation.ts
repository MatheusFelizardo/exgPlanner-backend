import db from '../../database'

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
    updateInfo: async ({ id, user, country, currentBudget, expense, totalCost, travelDate }: Info & {id: string}, context: any) => {
        try {
            const info = await db.infos.updateInfo(id, { user, country, currentBudget, expense, totalCost, travelDate, updatedAt: Date.now() })
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
    currentBudget?: string,
    updatedAt?: number, 
    expense?: string[],
    totalCost?: string, 
    travelDate?: string 
}

export default infoMutation