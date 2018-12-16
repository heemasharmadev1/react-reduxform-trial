import * as React from "react";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

import { INewTrainingState } from '../../state/INewTrainingControlsState'; 
import * as listActions from '../../actions/TrainingAction';
import { ITrainingWebpartProps } from '../TrainingWebpart/ITrainingWebpartProps';

import { renderDropDown, renderInput } from '../Redux-Form-CustomComponents/FieldRenderers';

import {
    DetailsList,
    SelectionMode
} from "office-ui-fabric-react";

/**
 * Properties
 */
interface Props {
    actions: any,
    items: Array<any>
}

/**
 * Demo List
 */
class DemoList extends React.Component<Props, any> {
    // Render the list
    render() {
        let {items} = this.props;
        return (
            <DetailsList items={this.props.items} />
        );
    }
}

/**
 * Connections
 */
export default connect(
    /**
     * State to Property Mapper
     */
    (state, ownProps) => {
        return {
            items: state.list.items
        };
    },
    /**
     * Actions Mapper
     */
    (dispatch) => {
        return {
            actions: listActions
        };
    }
)(DemoList);