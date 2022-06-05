import { errorName } from '../../constants/errorMessages'
import { InputGetLocation, InputCreateLocation } from "../../types/Location";

const resolvers = {
  Query: {
    getLocationInfo: async (_root: any, { zip_code } : InputGetLocation, ctx: any) => {
      try {
        const locationData = await ctx.location.findOne({ zip_code }).lean()
        if(!locationData){
          throw new Error(errorName.NOT_FOUND_ZIP_CODE)
        }
        return ({ city: locationData.city, country: locationData.country})
      } catch (error: any) {
        throw new Error(error.message)
      }
    }
  },
  Mutation: {
    createLocation: async (_root: any, { data } : InputCreateLocation, ctx: any) => {
      try {
        const locationData = await ctx.location.create(data)
        return locationData
      } catch (error) {
        throw new Error(errorName.SERVER_ERROR)
      }
    }
  }
}

export { resolvers }
