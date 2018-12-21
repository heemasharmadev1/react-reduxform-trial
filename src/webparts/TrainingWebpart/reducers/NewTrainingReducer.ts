import {INewTrainingState} from '../state/INewTrainingControlsState';
import {CreateNewTraining} from '../actions/TrainingAction';
import * as objectAssign from "object-assign";

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
            // state={
            //     trainingItems:action.payload.trainingItems
            // }
            return objectAssign(
                    //Create a blank state
                    {},
                    //copy the state
                    state,
                    //update the Display component state value
                    {trainingItems:action.payload.trainingItems}
                );
        default:
            state = {
                ...state,
                trainingItems:[]
            };
            break;
    }
    return state;
};