import React, { Component } from 'react';
import { styles } from './styles';
import { Aircraft_AircraftInfo_cabins as AircraftCabins } from '../../../../types/graphql';
import { AircraftFaresView } from './view';

interface IConnectProps {
  data: AircraftCabins[];
}

export class AircraftFaresController extends Component<IConnectProps> {
  checkFirst = (index: number) => {
    return index === 0;
  };

  checkFirstItem = (index: number) => {
    return this.checkFirst(index) ? {} : styles.notFirstItemDiv;
  };

  render() {
    const { data } = this.props;

    return <AircraftFaresView data={data} checkFirst={this.checkFirst} checkFirstItem={this.checkFirstItem} />;
  }
}
