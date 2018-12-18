import pnp, { ListEnsureResult } from "sp-pnp-js";
import { sp, Item, ItemAddResult, Web } from "sp-pnp-js";

import { INewTrainingState } from "../state/INewTrainingControlsState";
import INewTrainingService from "./INewTrainingService";
import {ITrainingsItem} from "../state/INewTrainingControlsState";
import { Conversation } from "sp-pnp-js/lib/graph/conversations";

export default class NewTrainingService implements INewTrainingService {
    //var listname:string = "Training List1";
    /*public convertToUTCDate(originDate:Date):string{
        let newDate:any;
        let datestr:string = originDate.toString();
        let newdate:Date = new Date(datestr);

        let fdate:Date = new Date(newdate.getTime() + Math.abs(newdate.getTimezoneOffset()*60000) )  

        let dateiso = this.ISODateString(fdate);
        //newDate = new Date(originDate.toUTCString()).toISOString();
        console.log('New Date: '+dateiso);
        return dateiso;
    }*/

    /*private ISODateString(d:Date): string {
        function pad(n) {return n<10 ? '0'+n : n}
        return (d.getUTCFullYear()+'-'
             + pad(d.getUTCMonth()+1)+'-'
             + pad(d.getUTCDate())+'T'
             + pad(d.getUTCHours())+':'
             + pad(d.getUTCMinutes())+':'
             + pad(d.getUTCSeconds())+'Z')
    }
    
    */

    // Creates a new training request. The request is created in one list. 
    async createNewTrainingItem(trainingData: INewTrainingState, siteUrl): Promise<any> {

        console.log("Inside the create training item service, site url: " + siteUrl);
        return pnp.sp.web.lists.ensure("Training List1")
            .then((result: ListEnsureResult) => {
                //if(result.created){
                console.log("Training item creation starts");
                if (trainingData.trainingItems != null && trainingData.trainingItems.length > 0) {
                    // Creates the multiple trnp,aining items in batch.
                    let web = new Web(siteUrl);
                    //let web = spfxContext;
                    //let batch = web.createBatch();
                    trainingData.trainingItems.forEach(trainingitem => {
                        web.lists.getByTitle("Training List1").items.add(
                            {
                                "Title": trainingitem.trainingTitle,
                                //TrainingStatus: trainingitem.trainingStatus,
                                //TrainingApproverId: parseInt(trainingitem.trainingApprover),
                                TrainingDate: trainingitem.dateOfTraining
                            }
                        ).then((iar: ItemAddResult) => {
                            console.log("Item added successfully");
                            alert("Bingo! Added!");
                        });
                        // web.lists.getByTitle("Training List1").items.inBatch(batch).add({
                        //     Title:trainingitem.trainingTitle,
                        //     TrainingStatus:trainingitem.trainingStatus,
                        //     TrainingApprover:trainingitem.trainingApprover,
                        //     TrainingDate:trainingitem.dateOfTraining
                        // });
                    });

                    // batch.execute().then(() => {
                    //     console.log("Training items added to the list....");
                    //     alert('Added');
                    // });
                    /*Code to fetch all the items */
                    //this.getAllTrainingItems(siteUrl);
                }
                else {
                    alert('Select atleast one training item.');
                }
               
            });
    }
    //Get all the training items
    async getAllTrainingItems(siteUrl) {
        //Return a new Promise
        //return new Promise((resolve,reject) => {

            let web = new Web(siteUrl);
            pnp.sp.web.lists.getByTitle("Training List1").items.select("Title","TrainingStatus","TrainingApproverId","TrainingDate").getAll()
             .then((items:ITrainingsItem[]) => {

                let trainings:ITrainingsItem[] = [];
                if(items.length > 0)
                {                    
                    for(let item of items)
                    {
                        var itemOfTraining:ITrainingsItem = {
                            trainingTitle: item["Title"],
                            trainingStatus: item["TrainingStatus"],
                            trainingApprover : item["TrainingApproverId"],
                            dateOfTraining : item["TrainingDate"]
                        };
                        trainings.push(itemOfTraining);
                    }
                    //console.log("Training Array length"+ trainings.length);
                    return(trainings);
                }
                else{
                    //Reject code can be written here
                    return null;
                }
             });
        //});
    }
}