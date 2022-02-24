// Module for interacting with the protocols API provided by api.vysio.ca
import { delRequest, getRequest, patchRequest, postRequest } from './http';

const getPlan = (planId) => {
    return getRequest(`/plans/${planId}`);
}

const getPlans = () => {
    return getRequest(`/plans`);
}

const createPlan = (name, repetitions, timeframe) => {
    return postRequest(`/plans`, {
        name: name,
        repetitions: repetitions,
        timeframe: timeframe
    });
}

const updatePlan = (planId, updateData) => {
    return patchRequest(`/plans/${planId}`, updateData);
}

const deletePlan = (planId) => {
    return delRequest(`/plans/${planId}`);
}

export {
    getPlan,
    getPlans,
    createPlan,
    updatePlan,
    deletePlan
}