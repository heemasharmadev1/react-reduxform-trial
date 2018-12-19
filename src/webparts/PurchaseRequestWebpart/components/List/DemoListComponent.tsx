import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { INewTrainingState } from '../../state/INewTrainingControlsState';
import { GetAllTraining } from '../../actions/TrainingAction';
import { ITrainingWebpartProps } from '../TrainingWebpart/ITrainingWebpartProps';
import { Field, reduxForm, InjectedFormProps, FieldArray, WrappedFieldArrayProps, BaseFieldArrayProps } from 'redux-form';
import { renderDropDown, renderInput } from '../Redux-Form-CustomComponents/FieldRenderers';
//import {ITrainingsItem} from "../state/INewTrainingControlsState";
import { ITrainingsItem } from "../../state/INewTrainingControlsState";
import pnp, { ListEnsureResult } from "sp-pnp-js";
import { sp, Item, ItemAddResult, Web } from "sp-pnp-js";

import {
    DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn,
    MarqueeSelection
} from "office-ui-fabric-react";

interface INewFormConnectedState {
    newFormControlValues: INewTrainingState;
    initialValues: any;
}
interface INewFormConnectedDispatch {
    getAllTrainingItems(siteUrl);
}

let _items: ITrainingsItem[] = [];
export interface IDetailsListDocumentsExampleState {
    columns: IColumn[];
    //items: IDocument[];
    items: ITrainingsItem[];
    isModalSelection: boolean;
    isCompactMode: boolean;
}
// export interface IDocument {
//     [key: string]: any;
//     name: string;
//     value: string;
//     iconName: string;
//     fileType: string;
//     modifiedBy: string;
//     dateModified: string;
//     dateModifiedValue: number;
//     fileSize: string;
//     fileSizeRaw: number;
// }
let _columns: IColumn[] = [];

class DemoListComponent extends React.Component<INewFormConnectedState & INewFormConnectedDispatch & ITrainingWebpartProps & InjectedFormProps<{}, INewFormConnectedState>, IDetailsListDocumentsExampleState>{
    constructor(props) {
        super(props);
         _columns = [
            {
                key: 'column1',
                name: 'Training Name',
                fieldName: 'name',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                data: 'string',
                isPadded: true
            },
            {
                key: 'column2',
                name: 'Date of Training',
                fieldName: 'dateModifiedValue',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                data: 'number',
                isPadded: true
            },
            {
                key: 'column3',
                name: 'Training Status',
                fieldName: 'modifiedBy',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                data: 'string',
                isPadded: true
            }
        ]
        //  Populate with items for demos.
        // if (_items.length === 0) {
        //     // for (let i = 0; i < 10; i++) {

        //     //     let fileName =  "Test 12";
        //     //     let userName  =  "Lorem Ipsum";
        //     //     //fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).concat(`.${randomFileType.docType}`);

        //     //     _items.push({
        //     //         name: fileName,
        //     //         value: fileName,
        //     //         iconName: "",
        //     //         fileType: "",
        //     //         modifiedBy: userName,
        //     //         dateModified: "",
        //     //         dateModifiedValue: 12,
        //     //         fileSize: "",
        //     //         fileSizeRaw: 20
        //     //     });
        //     // }
        //     //  _items = this._sortItems(_items, 'name');
        //     debugger;
        //     //this.props.getAllTrainingItems(this.props.siteUrl);
        //     console.log('log2 : '+this.props.getAllTrainingItems(this.props.siteUrl));
        //     // .then((items:any[]) => {
        //     //     let trainings:ITrainingsItem[] = [];
        //     //     if(items.length > 0)
        //     //     {                    
        //     //         for(let item of items)
        //     //         {
        //     //             var itemOfTraining:ITrainingsItem = {
        //     //                 trainingTitle: item["Title"],
        //     //                 trainingStatus: item["TrainingStatus"],
        //     //                 trainingApprover : item["TrainingApproverId"],
        //     //                 dateOfTraining : item["TrainingDate"]
        //     //             };
        //     //             trainings.push(itemOfTraining);
        //     //         }
        //     //         //console.log("Training Array length"+ trainings.length);
        //     //         //resolve(trainings);
        //     //     }
        //     //     else{
        //     //         //Reject code can be written here
        //     //     }
        //     // });
        // }

        // const _columns: IColumn[] = [
        //     // {
        //     //     key: 'column1',
        //     //     name: 'File Type',
        //     //     headerClassName: 'DetailsListExample-header--FileIcon',
        //     //     className: 'DetailsListExample-cell--FileIcon',
        //     //     iconClassName: 'DetailsListExample-Header-FileTypeIcon',
        //     //     ariaLabel: 'Column operations for File type, Press to sort on File type',
        //     //     iconName: 'Page',
        //     //     isIconOnly: true,
        //     //     fieldName: 'name',
        //     //     minWidth: 16,
        //     //     maxWidth: 16,
        //     //    // onColumnClick: this._onColumnClick,
        //     //     onRender: (item: IDocument) => {
        //     //         return <img src={item.iconName} className={'DetailsListExample-documentIconImage'} alt={item.fileType + ' file icon'} />;
        //     //     }
        //     // },
        //     {
        //         key: 'column1',
        //         name: 'Training Name',
        //         fieldName: 'name',
        //         minWidth: 210,
        //         maxWidth: 350,
        //         isRowHeader: true,
        //         isResizable: true,
        //         isSorted: true,
        //         isSortedDescending: false,
        //        // sortAscendingAriaLabel: 'Sorted A to Z',
        //        // sortDescendingAriaLabel: 'Sorted Z to A',
        //        // onColumnClick: this._onColumnClick,
        //         data: 'string',
        //         isPadded: true
        //     },
        //     {
        //         key: 'column2',
        //         name: 'Date of Training',
        //         fieldName: 'dateModifiedValue',
        //         minWidth: 70,
        //         maxWidth: 90,
        //         isResizable: true,
        //        // onColumnClick: this._onColumnClick,
        //         data: 'number',
        //         // onRender: (item: IDocument) => {
        //         //     return <span>{item.dateModified}</span>;
        //         // },
        //         isPadded: true
        //     },
        //     {
        //         key: 'column3',
        //         name: 'Training Status',
        //         fieldName: 'modifiedBy',
        //         minWidth: 70,
        //         maxWidth: 90,
        //         isResizable: true,
        //        // isCollapsible: true,
        //         data: 'string',
        //        // onColumnClick: this._onColumnClick,
        //         // onRender: (item: IDocument) => {
        //         //     return <span>{item.modifiedBy}</span>;
        //         // },
        //         isPadded: true
        //     }
        //     //,
        //     // {
        //     //     key: 'column5',
        //     //     name: 'File Size',
        //     //     fieldName: 'fileSizeRaw',
        //     //     minWidth: 70,
        //     //     maxWidth: 90,
        //     //     isResizable: true,
        //     //    // isCollapsible: true,
        //     //     data: 'number',
        //     //    // onColumnClick: this._onColumnClick,
        //     //     onRender: (item: IDocument) => {
        //     //         return <span>{item.fileSize}</span>;
        //     //     }
        //     // }
        // ];
        // console.log('log1 : '+this.props.newFormControlValues.trainingItems);

        // this.state = {
        //     items: _items,
        //     //items: ,
        //     columns: _columns,
        //     isModalSelection: false,
        //     isCompactMode: false
        // };

        this.state = {
            items: _items,
            //items: ,
            columns: _columns,
            isModalSelection: false,
            isCompactMode: false
        };

    }

    public componentDidMount() {
        if (_items.length === 0) {
            console.log(this.props.siteUrl);
            //var tempObj:ITrainingsItem[] = this.props.getAllTrainingItems(this.props.siteUrl);
            //let objitemcoll : [] = [];
             this.props.getAllTrainingItems(this.props.siteUrl).then((items) => {
                    console.log(items);
                });
            //_items.push(this.props.getAllTrainingItems(this.props.siteUrl));
          
        }
    }
    public render() {
        let newFormControlValues = this.props.newFormControlValues;
        const { columns, isCompactMode, items, isModalSelection } = this.state;

        return (
            <div>
                <h2>Training List</h2>
                {/* <DetailsList items={this.props.newFormControlValues.trainingItems} /> */}
                <DetailsList
                    items={items}
                    compact={isCompactMode}
                    columns={columns}
                    selectionMode={isModalSelection ? SelectionMode.multiple : SelectionMode.none}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    //selection={this._selection}
                    selectionPreservedOnEmptyClick={true}
                    enterModalSelectionOnTouch={true}
                    ariaLabelForSelectionColumn="Toggle selection"
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                />
            </div>
        );
    }
    // componentDidMount() {
    // }
}

// Maps the State to props
const mapStateToProps = (state): INewFormConnectedState => {
    // Includes the initialValues property to load the form with initial values
    return {
        newFormControlValues: state.NewFormControlValues,
        initialValues: state.NewFormControlValues
    };
};
// Maps dispatch to props
const mapDispatchToProps = (dispatch): INewFormConnectedDispatch => {
    return {
        getAllTrainingItems: (siteUrl: string) => {
            debugger;
            return dispatch(GetAllTraining(siteUrl)).then((items:any) => {
                console.log('Inside the component :' + items);
            });
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DemoListComponent);  
