import InfoModel from './infos';

export interface InfoI { 
    user?: string, 
    country?: string, 
    currentBudget?: string,
    updatedAt?: number, 
    expense?: string[],
    missing?: string, 
    travelDate?: string 
}

export const getInfoById = async (id: string) => {
    return await InfoModel.findById(id);
}

export const saveInfo = async ({  user, country, currentBudget, expense, missing, travelDate}: InfoI) => {
    return await InfoModel.create({  user, country, currentBudget, expense, missing, travelDate });
}

export const updateInfo = async (id: string, { user, country, currentBudget, expense, missing, travelDate, updatedAt }:InfoI) => {
    const update:InfoI = {};
    if (user) update.user = user;
    if (country) update.country = country;
    if (currentBudget) update.currentBudget = currentBudget;
    if (expense) update.expense = expense;
    if (missing) update.missing = missing;
    if (travelDate) update.travelDate = travelDate;
    update.updatedAt = updatedAt
    
    return await InfoModel.findByIdAndUpdate(id, update);
}

export const deleteInfo = async (id: string) => {
    return await InfoModel.findByIdAndDelete(id);
}