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