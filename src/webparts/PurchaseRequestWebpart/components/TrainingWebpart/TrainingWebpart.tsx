import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import ConfigureStore from "../../store/ConfigureStore";
import { connect } from "react-redux";
import { Provider } from "react-redux";

import styles from './TrainingWebpart.module.scss';
import { ITrainingWebpartProps } from './ITrainingWebpartProps';
import {INewTrainingState} from "../../state/INewTrainingControlsState";
import NewTrainingComponent from "../CreateNewTraining/CreateNewTrainingComponent";
import DemoListComponent from '../List/DemoListComponent';

export default class TrainingWebpart extends React.Component<ITrainingWebpartProps, {}> {
  
  public render(){

    // Initialize the redux store
    const trainingStore = ConfigureStore();
    
    return (
      <Provider store={trainingStore}>
          <NewTrainingComponent {...this.props}/>
          {/* <DemoListComponent {...this.props}/> */}
      </Provider>
    );
  }


}

