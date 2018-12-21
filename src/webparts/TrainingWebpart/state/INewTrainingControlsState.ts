// Represents a purchase request
export interface INewTrainingState{
    trainingItems:ITrainingsItem[]; 
}

// Represents one tarining item in the Training List.
export interface ITrainingsItem{
    trainingTitle:string;
    trainingStatus:string;
    trainingApprover:string;
    dateOfTraining:Date;
}