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
    DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn,
    MarqueeSelection
} from "office-ui-fabric-react";

/*interface Props {
    actions: any,
    items: Array<any>
}
class DemoListComponent extends React.Component<Props, any> {
    // Render the list
    render() {
        let {items} = this.props;
        return (
            <DetailsList items={this.props.items} />
        );
    }
}
export default connect(
    (state, ownProps) => {
        return {
            items: state.items
        };
    },
    (dispatch) => {
        return {
            actions: "GET_ALL_TRAININGS"
        };
    }
)(DemoListComponent);*/
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
            }
        ]

        this._onChangeText = this._onChangeText.bind(this);


        this.state = {
            items: _items,
            columns: _columns,
            isModalSelection: false,
            isCompactMode: false
        };
    }

    public componentWillMount(){
        if (_items.length === 0) {
            this._getAllTrainingItems(this.props.siteUrl);
       }
    }

    public componentDidMount() {
        if (_items.length === 0) {
             //this.props.getAllTrainingItems(this.props.siteUrl);
             this._getAllTrainingItems(this.props.siteUrl);
             //console.log("tempObj: "+tempObj);
            // this._getAllTrainingItems(this.props.siteUrl).then( data => {
            //         console.log(data);
            // });
        }
        //Here we can call the dispatch method of laoding the items
    }
    public render() {
        //let newFormControlValues = this.props.newFormControlValues;
        const { columns, isCompactMode, items, isModalSelection } = this.state;

        return (
            <div>
                <h2>Training List</h2>

                {/* <TextField onChange={ (e) => this.setState({ items: e ? _items.filter(i => i.name.toLowerCase().indexOf(e) > -1) : _items }) } /> */}

                <TextField label="Filter by name:" onChange={() => this._onChangeText} />

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
                {/* {this.props.newFormControlValues.map((temp, i) => <li key={i}>{temp.trainingTitle}</li> )} */}
            </div>
        );
    }

    private _getAllTrainingItems(siteUrl) {
        //Return a new Promise
        //return new Promise((resolve,reject) => {

            let web = new Web(siteUrl);
            pnp.sp.web.lists.getByTitle("Training List1").items.select("Title","TrainingStatus","TrainingApproverId","TrainingDate").getAll()
             .then((items:ITrainingsItem1[]) => {
                 // console.log(items);
                //let trainings:ITrainingsItem[] = [];
                if(items.length > 0)
                {                    
                    for(let item of items)
                    {
                        var itemOfTraining:ITrainingsItem1 = {
                            trainingTitle: item["Title"],
                            trainingStatus: item["TrainingStatus"],
                            trainingApprover : item["TrainingApproverId"],
                            dateOfTraining : item["TrainingDate"]
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

    private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
        console.log(text);
        this.setState({ items: text ? _items.filter(i => i.trainingTitle.toLowerCase().indexOf(text) > -1) : _items });
      };
    
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
