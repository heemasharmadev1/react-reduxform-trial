import * as React from "react";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

import { INewTrainingState } from '../../state/INewTrainingControlsState'; 
import { GetAllTraining } from '../../actions/TrainingAction';
import { ITrainingWebpartProps } from '../TrainingWebpart/ITrainingWebpartProps';
import { Field, reduxForm, InjectedFormProps, FieldArray, WrappedFieldArrayProps, BaseFieldArrayProps } from 'redux-form';
import { renderDropDown, renderInput } from '../Redux-Form-CustomComponents/FieldRenderers';

import {
    DetailsList,
    SelectionMode
} from "office-ui-fabric-react";

interface INewFormConnectedState{
    // Represents a training request and the data from the form.
    newFormControlValues : INewTrainingState;
    // Represents the initial values. << Unused now. Useful for edit item feature >>
    initialValues:any;
}
interface INewFormConnectedDispatch{
    //createNewTrainingItem:(trainingdata:INewTrainingState, siteUrl:string) => void;
    getAllTrainingItems(siteUrl) : Promise<any>;
}
class DemoListComponent extends React.Component<INewFormConnectedState & INewFormConnectedDispatch & ITrainingWebpartProps & InjectedFormProps<{}, INewFormConnectedState>>{
    constructor(props){
        super(props);
    }

    public render(){
        let items = this.props.newFormControlValues;

        return (
            <div>
                <h2>Training List</h2>
                <DetailsList items={this.props.newFormControlValues.trainingItems}/>
            </div>
        );
    }
    componentDidMount(){
    }
}
  
  // Maps the State to props
const mapStateToProps = (state) : INewFormConnectedState => {
    // Includes the initialValues property to load the form with initial values
    return{
        newFormControlValues : state.NewFormControlValues,
        initialValues : state.NewFormControlValues
    };
};
// Maps dispatch to props
const mapDispatchToProps = (dispatch):INewFormConnectedDispatch => {
    return{
        getAllTrainingItems:(siteUrl:string) => {
            return dispatch(GetAllTraining(siteUrl));
        }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(DemoListComponent);  
/**
 * Properties
 */
// interface Props {
//     actions: any,
//     items: Array<any>
// }

// /**
//  * Demo List
//  */
// class DemoList extends React.Component<Props, any> {
//     // Render the list
//     render() {
//         let {items} = this.props;
//         return (
//             <DetailsList items={this.props.items} />
//         );
//     }
// }

// /**
//  * Connections
//  */
// export default connect(
//     /**
//      * State to Property Mapper
//      */
//     (state, ownProps) => {
//         return {
//             items: state.list.items
//         };
//     },
//     /**
//      * Actions Mapper
//      */
//     (dispatch) => {
//         return {
//             actions: listActions
//         };
//     }
// )(DemoList);