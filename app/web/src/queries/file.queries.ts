import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'
import config from '@config'

export type FileState = {
  progress: number
  isPending: boolean
  isComplete: boolean
  isError: boolean
}

type Detection = {
  class_id: number
  class_name: string
  confidence: number
  bbox: [number, number, number, number][]
}

type DetectionResult = {
  message: string
  detections: Detection[]
  result_image: string
}

export const useFileUploadForProject = (fileStates?: Record<string, FileState>) => {
  const progress = ref(0)
  const isPending = ref(false)
  const isComplete = ref(false)
  const isError = ref(false)
  const resultImage = ref('')

  const mutation = useMutation({
    mutationFn: async ({ fileName, file }: { fileName: string; file: File }) => {
      const formData = new FormData()
      formData.append('file', file)
      const path = 'cracks'

      isPending.value = true
      isComplete.value = false
      isError.value = false

      return axios.post(`${config.api.url}/${path}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const progressValue = e.progress ? e.progress * 100 : 0
          progress.value = progressValue
          if (fileStates) fileStates[fileName].progress = progressValue
        },
      })
    },
    onSuccess: (response: DetectionResult) => {
      console.log(response)
      resultImage.value = response.data.result_image
      isComplete.value = true
      isPending.value = false
    },
    onError: () => {
      isError.value = true
      isPending.value = false
    },
  })

  return { ...mutation, progress, isPending, isComplete, isError, resultImage }
}
