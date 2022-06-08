import { IMealsService } from 'types';

export function countMealsBySegment(
  segment: IMealsService[]
): {
  meal: IMealsService;
  count: number;
}[] {
  return segment.reduce((acc, next) => {
    const target = acc.find(({ meal }) => meal.id === next.id);

    if (target) {
      return acc.map((item) =>
        item.meal.id === next.id
          ? {
              ...item,
              count: item.count + 1,
            }
          : item
      );
    }

    return [
      ...acc,
      {
        meal: next,
        count: 1,
      },
    ];
  }, []);
}
