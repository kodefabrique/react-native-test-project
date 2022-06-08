import { IStoreState } from 'types';
import { connect } from 'react-redux';
import { AircraftInfoTableController } from './controller';

const mapState = ({ aircraft: { aircraftInfo } }: IStoreState) => ({
  tableInfo: aircraftInfo?.parameters || [],
});

export const AircraftInfoTableConnect = connect(mapState)(AircraftInfoTableController);
