/**
 * Раскладывает плоский результат батч-запроса по ключам в том же порядке,
 * в каком DataLoader передал ключи (контракт DataLoader: длина и порядок
 * результата строго совпадают с ключами). Ключи без данных получают [].
 */
export function groupByKey<K, T>(
  keys: readonly K[],
  items: readonly T[],
  getKey: (item: T) => K,
): T[][] {
  const groups = new Map<K, T[]>(keys.map((key) => [key, []]));
  for (const item of items) {
    groups.get(getKey(item))?.push(item);
  }
  return keys.map((key) => groups.get(key) ?? []);
}
