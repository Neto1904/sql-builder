import FluentSqlBuilder from '../src/fluentSql'

const data = [
  {
    id: 0,
    name: 'erick',
    category: 'developer',
  },
  {
    id: 1,
    name: 'maria',
    category: 'developer',
  },
  {
    id: 2,
    name: 'joaozin',
    category: 'manager',
  },
]

describe('Test suite for FluentSql Builder', () => {
  test('#for should return a FluentSqlBuilder instance', () => {
    const result = FluentSqlBuilder.for(data)
    const expected = new FluentSqlBuilder({ database: data })
    expect(result).toStrictEqual(expected)
  })

  test('#build should return the empty object instance', () => {
    const result = FluentSqlBuilder.for(data).build()
    const expected = data
    expect(result).toStrictEqual(expected)
  })

  test('#limit should limit the collection results', () => {
    const result = FluentSqlBuilder.for(data).limit(1).build()
    const expected = [data[0]]
    expect(result).toStrictEqual(expected)
  })

  test('#where should filter the data in a collection', () => {
    const result = FluentSqlBuilder.for(data)
      .where({
        category: /^dev/,
      })
      .build()
    const expected = data.filter(
      ({ category }) => category.slice(0, 3) === 'dev'
    )
    expect(result).toStrictEqual(expected)
  })
  test('#select should return only te specified fields', () => {
    const result = FluentSqlBuilder.for(data)
      .select(['name', 'category'])
      .build()

    const expected = data.map(({ name, category }) => ({ name, category }))

    expect(result).toStrictEqual(expected)
  })

  test('#orderBy should order its results by specified field', () => {
    const result = FluentSqlBuilder.for(data).orderBy('name').build()

    const expected = [
      {
        id: 0,
        name: 'erick',
        category: 'developer',
      },
      {
        id: 2,
        name: 'joaozin',
        category: 'manager',
      },
      {
        id: 1,
        name: 'maria',
        category: 'developer',
      },
    ]

    expect(result).toStrictEqual(expected)
  })

  test('pipeline', () => {
    const result = FluentSqlBuilder.for(data)
      .where({ category: 'developer' })
      .select(['name', 'id'])
      .orderBy('name')
      .limit(1)
      .build()

    expect(result).toStrictEqual([{ id: 0, name: 'erick' }])
  })
})
