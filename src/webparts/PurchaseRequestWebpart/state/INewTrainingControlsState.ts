// Represents a purchase request
export interface INewTrainingState{

    // // Represent the choices to be displayed in dropdown when the form loads.
    // purchasedForOptions:string[];
    // typeOfPurchaseRequestOptions:string[];

    // // Represent the values selected for the fields
    // purchasedFor:string;
    // typeOfPurchaseRequest:string;
    trainingItems:ITrainingsItem[];    
}

// Represents one tarining item in the Training List.
export interface ITrainingsItem{
    trainingTitle:string;
    trainingStatus:string;
    trainingApprover:string;
    dateOfTraining:Date;
}