// Module for interacting with the protocols API provided by api.vysio.ca

const getProtocol = (id) => {
    return fetch(`${BASE_URL}/protocols/${id}`).then(res => res.json());
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