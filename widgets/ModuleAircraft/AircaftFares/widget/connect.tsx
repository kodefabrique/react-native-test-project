import { IStoreState } from 'types';
import { connect } from 'react-redux';
import { AircraftFaresController } from './controller';

const mapState = ({ aircraft: { aircraftInfo } }: IStoreState) => ({
  fares: aircraftInfo?.cabins,
});

export const AircraftFaresConnect = connect(mapState)(AircraftFaresController);
