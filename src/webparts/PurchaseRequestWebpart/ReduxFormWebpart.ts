import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as strings from 'DynamicGridWebpartWebPartStrings';
import {  UrlQueryParameterCollection } from '@microsoft/sp-core-library';

import TrainingWebpart from './components/TrainingWebpart/TrainingWebpart';
import { ITrainingWebpartProps } from './components/TrainingWebpart/ITrainingWebpartProps';
import pnp from "sp-pnp-js";

export interface IReduxFormWebpartProps {
  description: string;
}

export default class ReduxFormWebpart extends BaseClientSideWebPart<IReduxFormWebpartProps> {
 
  public onInit():Promise<void>{
      return super.onInit().then(
          _=>{
              pnp.setup({
                  spfxContext: this.context
              });
          }
      );
    }

  public render(): void {

    var queryParameters = new UrlQueryParameterCollection(window.location.href);
    let id: string = "";
    if (queryParameters.getValue("itemid")) {
      id = queryParameters.getValue("itemid");
    }
 
    const element: React.ReactElement<IReduxFormWebpartProps> = React.createElement(
      TrainingWebpart,
      {
        description: this.properties.description,
        siteUrl:this.context.pageContext.web.absoluteUrl,
        //siteUrl:spfxContext,
        spHttpClient:this.context.spHttpClient,
        itemId:id
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
