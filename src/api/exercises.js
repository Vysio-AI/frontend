// Module for interacting with the exercises API provided by api.vysio.ca

const getExercise = (id) => {
    return fetch(`${BASE_URL}/exercises/${id}`).then(res => res.json());
}

const createExercise = (params) => {

}

const updateExercise = () => {

}

const deleteExercise = () => {

}


module.exports = {
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
}