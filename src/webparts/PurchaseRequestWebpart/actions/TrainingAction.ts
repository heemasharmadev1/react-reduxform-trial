import {INewTrainingState} from '../state/INewTrainingControlsState';
import NewTrainingService from '../services/NewTrainingService';

// The file contains actions for the NewTrainingReducer

// Creates a new training item.
export function CreateNewTraining(trainingData:INewTrainingState,siteUrl){
    return dispatch => {
        let newTrainingServiceObj:NewTrainingService = new NewTrainingService();

        //need to modify this using the .then().catch() functions
        newTrainingServiceObj.createNewTrainingItem(trainingData,siteUrl);

        dispatch({
            type:"CREATE_NEW_TRAINING",
            payload: newTrainingServiceObj
        });
    }
}
// Fetches all the training items.
export function GetAllTraining(siteUrl){
    return dispatch => {
        let newTrainingServiceObj:NewTrainingService = new NewTrainingService();

        newTrainingServiceObj.getAllTrainingItems(siteUrl);

        dispatch({
            type: "GET_ALL_TRAININGS",
            payload: newTrainingServiceObj
        });
        
        /*.then(response => response.json().then(body => ({response,body})))
        .then(({ response, body }) => {
            if (!response.ok) {
                // If request was failed, dispatching FAILURE action.
                dispatch({
                  type: 'FETCH_TODOS_FAILURE',
                  error: body.error
                });
              } else {
                // When everything is ok, dispatching SUCCESS action.
                dispatch({
                  type: 'FETCH_TODOS_SUCCESS',
                  todos: body.todos
                });
              }
        });*/
    }
}