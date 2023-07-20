<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1>Jobs</h1>
       <p> {{ jobs }}</p>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { jobsService } from "../services/JobsService.js";
import { AppState } from "../AppState.js";

export default {
  setup(){
    async function getJobs(){
      try {
        await jobsService.getJobs()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      // logger.log('[JOBS PAGE MOUNTED]')
      getJobs()

    })
    return {
      jobs: computed(() => AppState.jobs)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>