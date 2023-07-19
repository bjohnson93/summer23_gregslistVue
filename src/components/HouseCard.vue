<template>
  <div class="bg-white border border-dark rounded d-flex">
        <img class="img-fluid house-img rounded-start" :src="houseProp.imgUrl" :alt="houseProp.description">
        <div class="p-3">
          <div class="mb-3">
            <h2>
              {{ houseProp.year }} {{ houseProp.bedrooms }} Bed, {{ houseProp.bathrooms }} Bath, {{ houseProp.levels }} Level
            </h2>
            <p class="fs-4">Listed at ${{ houseProp.price }}</p>
            <p class="fs-5">{{ houseProp.description }}</p>
            <h3>Listed by: {{ houseProp.creator.name }} on {{ houseProp.createdAt.toLocaleDateString() }}</h3>
            <img class="creator-picture" :src="houseProp.creator.picture" :alt="houseProp.creator.name">
          </div>
          <div>
            <button @click="removeHouse()" class="btn btn-danger"><i class="mdi mdi-delete" title="Delete this House"></i></button>
            <button @click="setHouseToEdit()" class="btn btn-warning ms-3" title="Edit House" type="button" data-bs-toggle="modal" data-bs-target="#formModal"><i class="mdi mdi-pencil" ></i></button>
          </div>


        </div>
      </div>
</template>


<script>
import { computed } from "vue";
import { House } from "../models/House.js";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js";

export default {
  props: {
    houseProp: { type: House, required: true}
  },
  setup(props){
    return {
      account: computed(() => AppState.account),

      async removeHouse(){
        try {
          const wantsToRemoveHouse = await Pop.confirm('Are you sure you want to delete this house?')
          if (!wantsToRemoveHouse) {
            return
          }
          const houseId = props.houseProp.id
          await housesService.removeHouse(houseId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.house-img{
  width: 40%;
  object-fit: cover;
  object-position: center;
}
.creator-picture{
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
}

</style>