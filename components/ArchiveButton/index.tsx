import React, { memo, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import { MButtonInlineWithIcon } from 'ui';
import { ROUTE_NAME } from 'view/constants';
import { useSelector } from 'view/hooks';

interface IWidgetProps {
  type: 'tours' | 'airs' | 'hotels' | 'transfers' | 'excursions';
  title: string;
}

const Component = function ({ type, title }: IWidgetProps) {
  const navigation = useNavigation();

  const archivedTours = useSelector((state) => state.ordersCore.archivedTours);

  const archivedAirs = useSelector((state) => state.ordersCore.archivedAirs);

  const archivedHotels = useSelector(
    (state) => state.ordersCore.archivedHotels,
  );

  const archivedTransfers = useSelector(
    (state) => state.ordersCore.archivedTransfers,
  );

  const archivedExcursionsPreview = useSelector(
    (state) => state.ordersCore.archivedExcursionsPreview,
  );

  const isGettingArchivedTours = useSelector(
    (state) => state.ordersApp.isGettingArchivedTours,
  );

  const isGettingArchivedAirs = useSelector(
    (state) => state.ordersApp.isGettingArchivedAirs,
  );

  const isGettingArchivedHotels = useSelector(
    (state) => state.ordersApp.isGettingArchivedHotels,
  );

  const isGettingArchivedTransfers = useSelector(
    (state) => state.ordersApp.isGettingArchivedTransfers,
  );

  const archivedExcursionsStatus = useSelector(
    (state) => state.ordersApp.archivedExcursionsStatus,
  );

  const onArchivePress = useCallback(() => {
    switch (type) {
      case 'tours':
        return navigation.navigate(ROUTE_NAME.ARCHIVE_TOUR);
      case 'airs':
        return navigation.navigate(ROUTE_NAME.ARCHIVE_FLIGHT);
      case 'hotels':
        return navigation.navigate(ROUTE_NAME.ARCHIVE_HOTEL);
      case 'transfers':
        return navigation.navigate(ROUTE_NAME.ARCHIVE_TRANSFER);
      case 'excursions':
        return navigation.navigate(ROUTE_NAME.ARCHIVE_EXCURSION);
      default:
        return () => null;
    }
  }, [navigation, type]);

  const shouldRenderButton = useMemo(() => {
    switch (type) {
      case 'tours':
        return (
          !isGettingArchivedTours &&
          archivedTours !== null &&
          archivedTours.length > 0
        );
      case 'airs':
        return (
          !isGettingArchivedAirs &&
          archivedAirs !== null &&
          archivedAirs.length > 0
        );
      case 'hotels':
        return (
          !isGettingArchivedHotels &&
          archivedHotels !== null &&
          archivedHotels.length > 0
        );
      case 'transfers':
        return (
          !isGettingArchivedTransfers &&
          archivedTransfers !== null &&
          archivedTransfers.length > 0
        );
      case 'excursions':
        return (
          archivedExcursionsStatus !== 'processing' &&
          archivedExcursionsPreview !== null &&
          archivedExcursionsPreview.length > 0
        );
      default:
        return false;
    }
  }, [
    archivedAirs,
    archivedExcursionsPreview,
    archivedExcursionsStatus,
    archivedHotels,
    archivedTours,
    archivedTransfers,
    isGettingArchivedAirs,
    isGettingArchivedHotels,
    isGettingArchivedTours,
    isGettingArchivedTransfers,
    type,
  ]);

  return (
    <MButtonInlineWithIcon
      disabled={!shouldRenderButton}
      title={title}
      onPress={onArchivePress}
    />
  );
};

export const ArchiveButton = memo(Component);
