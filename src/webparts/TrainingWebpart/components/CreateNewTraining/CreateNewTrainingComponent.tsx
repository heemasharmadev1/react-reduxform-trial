import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Field, reduxForm, InjectedFormProps, FieldArray, WrappedFieldArrayProps, BaseFieldArrayProps } from 'redux-form';
import pnp from 'sp-pnp-js';

import { INewTrainingState } from '../../state/INewTrainingControlsState'; 
import { CreateNewTraining } from '../../actions/TrainingAction';
import { ITrainingWebpartProps } from '../TrainingWebpart/ITrainingWebpartProps';

import { renderDropDown, renderInput } from '../Redux-Form-CustomComponents/FieldRenderers';

//Adding a component here in the main file
import DemoListComponent from '../List/DemoListComponent';

// Connected state
interface INewFormConnectedState{

    // Represents a training request and the data from the form.
    newFormControlValues : INewTrainingState;

    // Represents the initial values. << Unused now. Useful for edit item feature >>
    initialValues:any;
}

// Represents the connected dispatch
interface INewFormConnectedDispatch{
    createNewTrainingItem:(trainingdata:INewTrainingState, siteUrl:string) => void;
}

// Validations for the redux form
const required = value => (value ? undefined : ' *');
const number = value =>
value && isNaN(Number(value)) ? ' Invalid value' : undefined;

// Represents the repeating purchase items component. 
// Used in "NewRequestComponent" react component below along with "FieldsArray" from redux-form.
// Renders custom input component with validations
class TrainingItemsComponent extends React.Component<WrappedFieldArrayProps<any>,{}>{
    public render(){
        return(
            <div>
                <button type="button" onClick={() => this.props.fields.push({})}>Add new training item</button>
                {this.props.fields.map((trainingItem, index) =>
                <tr>
                    <div>
                        <h4>Item {index + 1}</h4>
                        <td>
                            <Field key={index+1} name={`${trainingItem}.trainingTitle`} type="text" component={renderInput} placeholder="Training Title" validate={[required]}/>
                        </td>
                        {/* <td>
                            <Field key={index+1} name={`${trainingItem}.trainingStatus`} type="text" component={renderInput} placeholder="Pending" />
                        </td>
                        <td>
                            <Field key={index+1} name={`${trainingItem}.trainingApprover`} type="text" component={renderInput} placeholder="Training Approver"/>
                        </td> */}
                        <td>
                            <Field key={index+1} name={`${trainingItem}.dateOfTraining`} type="Date" component={renderInput} placeholder="MM/DD/YYYY" validate={[required]}/>
                        </td>
                        <td>
                            <button type="button" title="Remove Item" onClick={() => this.props.fields.remove(index)}>Remove item</button>
                        </td>
                    </div>
                </tr>
                )}
          </div>
        );
    }
}
class NewTrainingComponent extends React.Component<INewFormConnectedState & INewFormConnectedDispatch & ITrainingWebpartProps & InjectedFormProps<{}, INewFormConnectedState>>{
    
    constructor(props){
        super(props);
    }

    public render(){
        return(
            <div>
             {/* Sent the props as well to the SubmitForm handler to use the Connected Dispatch. Renders custom dropdown component with validation*/}
             <form onSubmit={this.props.handleSubmit(((values)=>this.SubmitForm(values,this.props)))}>
                  <table>
                      <FieldArray name="trainingItems" component={TrainingItemsComponent}/>
                  </table>
                  <br/>
                  <button type="submit" disabled={this.props.submitting}>Save Training Item(s)</button>
                  <br/>
              </form> 
              {/* Calling the other component here              */}
              <DemoListComponent {...this.props}/>
            </div>
        );
    }

    // Handles the submit form.
    SubmitForm(values, props){
        let trainingData = {} as INewTrainingState;
        trainingData = values;
        
        // Call the connected dispatch to create new training request
        props.createNewTrainingItem(trainingData,props.siteUrl);
    }
    componentDidMount(){
        //this.props.getDefaultControlsData();
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
        createNewTrainingItem:(trainingData:INewTrainingState, siteUrl:string) => {
            return dispatch(CreateNewTraining(trainingData,siteUrl));
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(
    reduxForm<{},INewFormConnectedState>(
        {
            form:'NewTrainingForm',
            destroyOnUnmount:false,
            // Reinitializes when the state changes. << Unused at the moment. Useful in edit item feature >>
            enableReinitialize:true
        }
    )(NewTrainingComponent)
);
