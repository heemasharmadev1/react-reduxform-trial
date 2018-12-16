/*import { INewFormState } from '../state/INewFormControlsState';
import { GetInitialControlValuesAction } from '../actions/NewFormControlsValuesAction';
*/
import {INewTrainingState} from '../state/INewTrainingControlsState';
import {CreateNewTraining} from '../actions/TrainingAction';

// Initial state of the Training item.
export const newTrainingInitialState:INewTrainingState = {
    trainingItems:[]
};

export const NewTrainingReducer  = (state:INewTrainingState,action) => {
    switch(action.type){

        case "CREATE_NEW_TRAINING":
            state={
                ...state,
                trainingItems:action.payload.trainingItems
            };
            break;
        
        case "GET_ALL_TRAININGS":
            // state={
            //     ...state,
            //     trainingItems:action.payload.trainingItems
            // }
            state={
                trainingItems:action.payload.trainingItems
            }

        default:
            state = {
                ...state,
                trainingItems:[]
            };
            break;
    }
    return state;
};