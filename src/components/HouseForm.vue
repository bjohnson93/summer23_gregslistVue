<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-floating mb-3">
      <input v-model="editable.year" required type="number" class="form-control" id="year" placeholder="Year..." min="1700" max="2023">
      <label for="year">Year</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.bedrooms" required type="number" class="form-control" id="bedrooms" placeholder="bedrooms..." min="0" max="20">
      <label for="bedrooms">Bedrooms</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.bathrooms" required type="number" class="form-control" id="bathrooms" placeholder="Bathrooms..." min="0" max="20">
      <label for="bathrooms">Bathrooms</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.levels" required type="number" class="form-control" id="levels" placeholder="levels..." min="0" max="20">
      <label for="levels">Levels</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.price" required type="number" class="form-control" id="price" placeholder="price..." min="0" max="2000000000">
      <label for="price">Price</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.description" required type="text" class="form-control" id="description" placeholder="description..." minlength="3" maxlength="500">
      <label for="description">Description</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editable.imgUrl" required type="url" class="form-control" id="imgUrl" placeholder="Image..." min="0" maxlength="1000">
      <label for="imgUrl">Image</label>
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
  </form>
</template>


<script>
import { onMounted, ref, watchEffect } from "vue"
import Pop from "../utils/Pop.js"
import { housesService } from "../services/HousesService.js"
import { AppState } from "../AppState.js"
import { Modal } from "bootstrap"

export default {
  setup(){
    const editable = ref({})

    function setFormDefaults(){
      editable.value.description = 'pretty nice house'
    }

    onMounted(() => {
      setFormDefaults()
    })

    
    return {
      editable,
      handleSubmit() {
        if (editable.value.id) {
          this.editHouse()
        }
        else {
          this.createHouse()
        }
      },
      async createHouse() {
        try {
          const houseData = editable.value
          await housesService.createHouse(houseData)
          editable.value = {}
          setFormDefaults()
          Modal.getOrCreateInstance('#formModal').hide()
        } catch (error) {
          Pop.error(error)
        }
      },
      async editHouse(){
        try {
          const houseData = editable.value
          await housesService.editHouse(houseData)
          editable.value = {}
          setFormDefaults()
          Modal.getOrCreateInstance('#formModal').hide()
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>