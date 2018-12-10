import { INewTrainingState } from '../state/INewTrainingControlsState';

// Represents the service to interact with SharePoint to work with training item requests.
export default interface INewTrainingService{
    createNewTrainingItem(trainingData:INewTrainingState,siteUrl) : Promise<any>;
}