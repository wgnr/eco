import { Mongo } from "./Mongo"

export enum DBConnections {
  MONGO = "Mongo",
  FS = "fs",
  DEFAULT = MONGO
}
type AvailableDBConnections = DBConnections | undefined

export const DBFactory = {
  async connect(type: AvailableDBConnections) {
    switch (type) {
      case "fs":
        return "... TBD (???)"
      case "Mongo":
      default:
        return await (await Mongo).get()
    }
  }
}