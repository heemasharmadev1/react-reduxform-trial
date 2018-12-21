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

import { TextField } from 'office-ui-fabric-react/lib/TextField';

import {
    DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn,DefaultButton,
    MarqueeSelection
} from "office-ui-fabric-react";

interface INewFormConnectedState {
//    newFormControlValues: INewTrainingState;
    newFormControlValues: ITrainingsItem[];
    initialValues: any;
}
interface INewFormConnectedDispatch {
    getAllTrainingItems(siteUrl);
}
export interface ITrainingsItem1{
    [key: string]: any;
    trainingTitle:string;
    trainingStatus:string;
    trainingApprover:string;
    dateOfTraining:Date;
    trainingId: number;
}
let _items: ITrainingsItem1[] = [];
export interface IDetailsListDocumentsExampleState {
    columns: IColumn[];
    items: ITrainingsItem1[];
    isModalSelection: boolean;
    isCompactMode: boolean;
}
export interface IDocument {
    [key: string]: any;
    name: string;
    value: string;
    iconName: string;
    fileType: string;
    modifiedBy: string;
    dateModified: string;
    dateModifiedValue: number;
    fileSize: string;
    fileSizeRaw: number;
}
let _columns: IColumn[] = [];

class DemoListComponent extends React.Component<INewFormConnectedState & INewFormConnectedDispatch & ITrainingWebpartProps & InjectedFormProps<{}, INewFormConnectedState>, IDetailsListDocumentsExampleState>{
    constructor(props) {
        super(props);
         _columns = [
            {
                key: 'column1',
                name: 'Training Name',
                fieldName: 'trainingTitle',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                data: 'string',
                isPadded: true,
                onRender: (item: ITrainingsItem1) => {
                    return <span>{item.trainingTitle}</span>;
                  }
            },
            {
                key: 'column2',
                name: 'Date of Training',
                fieldName: 'dateOfTraining',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                data: 'number',
                isPadded: true,
                onRender: (item: ITrainingsItem1) => {
                    return <span>{item.dateOfTraining}</span>;
                  }
            },
            {
                key: 'column3',
                name: 'Training Status',
                fieldName: 'trainingStatus',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                data: 'string',
                isPadded: true,
                onRender: (item: ITrainingsItem1) => {
                    return <span>{item.trainingStatus}</span>;
                  }
            },
            {
                key: 'column4',
                name: '',
                fieldName: 'Delete',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                data: 'string',
                isPadded: true,
                onRender: (item: ITrainingsItem1) => {
                    return <DefaultButton
                    data-automation-id="test"
                    text="Delete"
                    onClick={(e) => this.onbtnclick(item.trainingId)} />;
                  }
            }
        ]
        this._onChangeText = this._onChangeText.bind(this);
        this.onbtnclick = this.onbtnclick.bind(this);

        this.state = {
            items: _items,
            columns: _columns,
            isModalSelection: false,
            isCompactMode: false
        };
    }
    public onbtnclick(obj): any {
        console.log(obj);
        let web = new Web(this.props.siteUrl);
        pnp.sp.web.lists.getByTitle("Training List1").items.getById(obj).delete().then( data => {
            this._getAllTrainingItems(this.props.siteUrl);
        })
        //console.log(this.state.PeopickerItems);
    }
    private _onChangeText = (text: string): void => {
        console.log(text);
        this.setState({ items: text ? _items.filter(i => i.trainingTitle.toLowerCase().indexOf(text) > -1) : _items });
    };

    public componentWillMount(){
        if (_items.length === 0) {
            this._getAllTrainingItems(this.props.siteUrl);
       }
    }
    //Here we can call the dispatch method of laoding the items
    public componentDidMount() {
        if (_items.length === 0) {
            this._getAllTrainingItems(this.props.siteUrl);
        }
    }
    public render() {
        //let newFormControlValues = this.props.newFormControlValues;
        const { columns, isCompactMode, items, isModalSelection } = this.state;

        return (
            <div>
                <h2>Training List</h2>
                <TextField label="Filter by Title:" onChanged={(e) => this._onChangeText(e)} />
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

    private _getAllTrainingItems(siteUrl) {
        //Return a new Promise
        //return new Promise((resolve,reject) => {

        let web = new Web(siteUrl);
        pnp.sp.web.lists.getByTitle("Training List1").items.select("ID","Title","TrainingStatus","TrainingApproverId","TrainingDate").getAll()
            .then((items:ITrainingsItem1[]) => {
                
            if(items.length > 0)
            {
                _items = [];  
                for(let item of items)
                {
                    var itemOfTraining:ITrainingsItem1 = {
                        trainingTitle: item["Title"],
                        trainingStatus: item["TrainingStatus"],
                        trainingApprover : item["TrainingApproverId"],
                        dateOfTraining : item["TrainingDate"],
                        trainingId: item["ID"]
                    };
                    _items.push(itemOfTraining);
                }
                console.log(_items);
                this.setState({
                    items : _items
                })
                return(this.state.items);
            }
            else{
                return null;
            }
            });
    }
}

//Maps the State to props
const mapStateToProps = (state): INewFormConnectedState => {
    // Includes the initialValues property to load the form with initial values
    return {
        newFormControlValues: state.NewFormControlValues,
        initialValues: state.NewFormControlValues
    };
};
//Maps dispatch to props
const mapDispatchToProps = (dispatch): INewFormConnectedDispatch => {
    return {
        getAllTrainingItems: (siteUrl: string) => {
            return dispatch(GetAllTraining(siteUrl))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DemoListComponent);  
