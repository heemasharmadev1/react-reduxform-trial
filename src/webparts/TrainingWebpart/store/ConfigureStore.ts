import { createStore,combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'; 

import { NewTrainingReducer }  from "../reducers/NewTrainingReducer";
//import { NewPurchaseRequestReducer }  from "../reducers/NewPurchaseRequestReducer";

// Configures the redux store.
export default function ConfigureStore():any{
    
    // Combine multiple reducers to create the store. FormReducer is for the redux-form.
    const TrainingRequestStore = createStore(
        combineReducers
        ({
            NewFormControlValues:NewTrainingReducer,
            form:formReducer            
        }),
        {},
        applyMiddleware(thunk)
    );

    return TrainingRequestStore;
}
/*
// Configures the redux store.
export default function ConfigureStore():any{
    
    // Combine multiple reducers to create the store. FormReducer is for the redux-form.
    const PurchaseRequestStore = createStore(
        combineReducers
        ({
            NewFormControlValues:NewPurchaseRequestReducer,
            form:formReducer
        }),
        {},
        applyMiddleware(thunk)
    );

    return PurchaseRequestStore;
}
*/