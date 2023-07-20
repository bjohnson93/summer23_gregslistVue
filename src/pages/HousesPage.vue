<template>
 <div class="container-fluid">
  <div class="row mb-3">
    <div class="col-12">
      <h1>Houses</h1>
      <button @click="clearActiveHouse()" v-if="account.id" class="btn btn-secondary fs-4" data-bs-toggle="modal" data-bs-target="#formModal">Create House Listing</button>
    </div>
  </div>
  <div class="row">
    <div v-for="house in houses" :key="house.id" class="col-md-10 m-auto mb-3">

      <!-- <div class="bg-white rounded d-flex">
        <img class="img-fluid" :src="house.imgUrl" :alt="house.description">
        <div>
          <h2>
            {{ house.year }} {{ house.bedrooms }} Bedroom, {{ house.bathrooms }} Bathroom

          </h2>
        </div>
      </div> -->
      <HouseCard :houseProp="house"/>
    </div>
  </div>
 </div>

 <ModalComponent>
  <template #header>
    <span>House Form</span>
  </template>
  <template #body>
  <HouseForm />
  </template>
 </ModalComponent>
</template>


<script>
import HouseCard from '../components/HouseCard.vue';
import ModalComponent from "../components/ModalComponent.vue";
import HouseForm from "../components/HouseForm.vue";
import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js"
import { AppState } from "../AppState.js";

export default {
  setup(){
    async function getHouses(){
      try {
        await housesService.getHouses()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() =>{
      // logger.log('[Houses Page mounted]')
      getHouses()
    })
    return {
      houses: computed(() => AppState.houses),
      account: computed(() => AppState.account),

      clearActiveHouse() {
        const dummyHouse = { description: 'pretty nice house'}
        housesService.setHouseToEdit(dummyHouse)
      }
    }
  },
  components: { HouseCard, ModalComponent, HouseForm }
}
</script>


<style lang="scss" scoped>

</style>