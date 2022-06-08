import React, { Component } from 'react';
import { Aircraft_AircraftInfo_parameters as AircraftParameters } from '../../../../types/graphql';
import { AircraftInfoTableView } from './view';

interface IConnectProps {
  tableInfo: AircraftParameters[];
}

export class AircraftInfoTableController extends Component<IConnectProps> {
  render() {
    const { tableInfo } = this.props;

    return <AircraftInfoTableView data={tableInfo} />;
  }
}
