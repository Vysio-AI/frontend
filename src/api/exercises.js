// Module for interacting with the exercises API provided by api.vysio.ca
import { delRequest, getRequest, patchRequest, postRequest } from './http';

const getExercise = (exerciseId) => {
    return getRequest(`/exercises/${exerciseId}`)
}

const createExercise = (planId, activityType, duration) => {
    return postRequest(`/exercises`, {
        planId: planId,
        activityType: activityType,
        duration: duration
    });
}

const updateExercise = (exerciseId, updateData) => {
    return patchRequest(`/exercises/${exerciseId}`, updateData)
}

const deleteExercise = (exerciseId) => {
    return delRequest(`/exercises/${exerciseId}`);
}


export {
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
}