import { describe, expect, it } from 'vitest';
import { groupByKey } from './group-by-key.js';

describe('groupByKey', () => {
  const items = [
    { id: 1, ownerId: 2 },
    { id: 2, ownerId: 1 },
    { id: 3, ownerId: 2 },
  ];

  it('сохраняет порядок ключей и группирует элементы', () => {
    const result = groupByKey([2, 1], items, (item) => item.ownerId);
    expect(result).toEqual([[items[0], items[2]], [items[1]]]);
  });

  it('возвращает пустой массив для ключей без данных', () => {
    const result = groupByKey([1, 99], items, (item) => item.ownerId);
    expect(result).toEqual([[items[1]], []]);
  });

  it('игнорирует элементы с неизвестным ключом', () => {
    const result = groupByKey([1], items, (item) => item.ownerId);
    expect(result).toEqual([[items[1]]]);
  });
});
