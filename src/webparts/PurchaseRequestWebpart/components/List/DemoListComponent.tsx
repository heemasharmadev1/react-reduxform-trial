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

let _items: ITrainingsItem[] = [];
export interface IDetailsListDocumentsExampleState {
    columns: IColumn[];
    items: ITrainingsItem[];
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
        this.state = {
            items: _items,
            columns: _columns,
            isModalSelection: false,
            isCompactMode: false
        };
    }
    public componentDidMount() {
        if (_items.length === 0) {
             var tempObj = this.props.getAllTrainingItems(this.props.siteUrl);
             console.log("tempObj: "+tempObj);
        }
        //Here we can call the dispatch method of laoding the items
    }
    public render() {
        //let newFormControlValues = this.props.newFormControlValues;
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
                {this.props.newFormControlValues.map((temp, i) => <li key={i}>{temp.trainingTitle}</li> )}
            </div>
        );
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
