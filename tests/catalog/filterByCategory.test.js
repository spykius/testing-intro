const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

const ids = (list) => list.map((product) => product.id);
const allIds = [1, 2, 3, 4, 5, 6];

describe('filterByCategory', () => {
  test.each([
    ['all', 'all'],
    ['undefined', undefined],
    ['пустая строка', ''],
  ])('%s возвращает товары ID [1, 2, 3, 4, 5, 6]', (label, category) => {
    expect(ids(filterByCategory(products, category))).toEqual(allIds);
  });

  test.each([
    ['electronics', [1, 2]],
    ['books', [3, 6]],
    ['home', [4, 5]],
  ])('%s возвращает товары с ID %j', (category, expectedIds) => {
    expect(ids(filterByCategory(products, category))).toEqual(expectedIds);
  });

  test.each(['clothes', 'toys', 'sports'])("'%s' возвращает пустой массив", (category) => {
    expect(ids(filterByCategory(products, category))).toEqual([]);
  });
});
