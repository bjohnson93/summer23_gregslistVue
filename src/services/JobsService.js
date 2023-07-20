import { AppState } from "../AppState.js"
import { Job } from "../models/Job.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class JobsService {
  async getJobs() {
    const res = await api.get('api/jobs')
    logger.log('[GOT JOBS?]', res.data)
    const jobs = res.data.map(jobPojo => new Job(jobPojo))
    AppState.jobs = jobs
  }
}
export const jobsService = new JobsService()