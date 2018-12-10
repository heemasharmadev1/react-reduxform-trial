import pnp, { ListEnsureResult } from "sp-pnp-js";
import { sp,Item, ItemAddResult,Web } from "sp-pnp-js";

import { INewTrainingState } from "../state/INewTrainingControlsState";
import INewTrainingService from "./INewTrainingService";


export default class NewTrainingService implements INewTrainingService{

    // Creates a new training request. The request is created in one list. 
    async createNewTrainingItem(trainingData:INewTrainingState,siteUrl) : Promise<any>{
        
        console.log("Inside the create training item service, site url: "+siteUrl);
        return pnp.sp.web.lists.ensure("Training List1") 
        .then((result:ListEnsureResult) => {
            if(result.created){
                // console.log("Training item creattion starts");
                // if(trainingData.trainingItems != null && trainingData.trainingItems.length > 0){
                //     // Creates the multiple training items in batch.
                //     let web = new Web(siteUrl);
                //     let batch = web.createBatch();
                    
                //     trainingData.trainingItems.forEach(trainingitem => {
                //         web.lists.getByTitle("Training List1").items.inBatch(batch).add({
                //             Title:trainingitem.trainingTitle,
                //             TrainingStatus:trainingitem.trainingStatus,
                //             TrainingApprover:trainingitem.trainingApprover,
                //             TrainingDate:trainingitem.dateOfTraining
                //         });
                //     });

                //     batch.execute().then(()=>{
                //         console.log("Training items added to the list....");
                //         alert('Added');
                //     });
                // }
                // else{
                //     alert('Select atleast one training item.');
                // }
            }
            else
            {
                alert('List not present.');
            }
        });
    }
}