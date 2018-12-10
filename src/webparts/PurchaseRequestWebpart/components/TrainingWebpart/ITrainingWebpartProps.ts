import { SPHttpClient } from '@microsoft/sp-http';

export interface ITrainingWebpartProps {
  description: string;
  siteUrl:string;
  spHttpClient:SPHttpClient;
  itemId:string;
}