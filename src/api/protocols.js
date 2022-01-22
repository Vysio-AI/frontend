const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the protocols API provided by api.vysio.ca

const getProtocol = async (id) => {
    return fetch(`${BASE_URL}/protocols/${id}`).then(res => res.json());
}

const createExercise = async (params) => {

}

const updateExercise = async () => {

}

const deleteExercise = async () => {

}


module.exports = {
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
}