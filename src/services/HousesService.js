import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class HousesService {

  async getHouses() {
    const res = await api.get('api/houses')
    // logger.log('[got houses?]', res.data)
    const houses = res.data.map(housePojo => new House(housePojo))
    AppState.houses = houses
  }
  async createHouse(houseData) {
    const res = await api.post('api/houses', houseData)
    logger.log('[CREATED HOUSE]', res.data)
    const house = new House(res.data)
    AppState.houses.push(house)
  }
  async removeHouse(houseId) {
    const res = await api.delete(`api/houses/${houseId}`)
    logger.log('[ removed house ]', res.data)
    const houseIndex = AppState.houses.findIndex(house => house.id == houseId)
    AppState.houses.splice(houseIndex, 1)
  }
  async editHouse(houseData) {
    const res = await api.put(`api/houses/${houseData.id}`, houseData)
    logger.log('Edited House', res.data)
    const house = new House(res.data)
    const houseIndex = AppState.houses.findIndex(house => house.id == houseData.id)
    AppState.houses.splice(houseIndex, 1, house)
  }

  setHouseToEdit(houseToEdit) {
    AppState.activeHouse = houseToEdit
  }
}

export const housesService = new HousesService()