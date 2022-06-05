const {
  resolvers: {
    Mutation: { createLocation },
    Query: { getLocationInfo }
  }
// eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('./resolvers')

const mockLocation = {
  city: 'test_city',
  country: 'test_country'
}

describe('resolvers', () => {
  describe('getLocationInfo', () => {
    let args: any
    let findOne: any
    let ctx: any

    beforeEach(() => {
      findOne = jest.fn()
      ctx = {
        location: {
          findOne
        }
      }
      args = {
        zip_code: 12345
      }
    })

    it('calls findOne and returns result', async () => {
      findOne.mockImplementationOnce(() => ({
        lean: jest.fn().mockResolvedValueOnce(mockLocation)
      }))
      const actual = await getLocationInfo(null, args, ctx)
      expect(actual).toEqual(mockLocation)
    })
  })

  describe('createLocation', () => {
    let args: any
    let create: any
    let ctx: any

    beforeEach(() => {
      create = jest.fn()
      ctx = {
        location: {
          create
        }
      }
      args = {
        data: {
          mockLocation
        }
      }
    })

    it('calls createLocation and returns result', async () => {
      create.mockResolvedValueOnce(mockLocation)
      const actual = await createLocation(null, args, ctx)
      expect(actual).toEqual(mockLocation)
    })
  })
})
