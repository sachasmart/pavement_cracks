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

export const useFileUploadForProject = (fileStates?: Record<string, FileState>) => {
  const progress = ref(0)
  const isPending = ref(false)
  const isComplete = ref(false)
  const isError = ref(false)

  const mutation = useMutation({
    mutationFn: async ({ fileName, file }: { fileName: string; file: File; prefix?: string }) => {
      const formData = new FormData()
      formData.append('file', file)
      const path = 'cracks'

      isPending.value = true
      isComplete.value = false
      isError.value = false

      await axios
        .post(`${config.api.url}/${path}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (e) => {
            if (!e.progress) {
              progress.value = 0
              if (fileStates) fileStates[fileName].progress = 0
              return
            }
            if (fileStates) {
              fileStates[fileName].progress = e.progress * 100
            }
            progress.value = e.progress * 100
          },
        })
        .then((response) => {
          if (fileStates) {
            fileStates[fileName] = { ...fileStates[fileName], isComplete: true, isPending: false }
          }
          isComplete.value = true
          isPending.value = false
          console.log('response', response)
          return response
        })
        .catch((error) => {
          if (fileStates) {
            fileStates[fileName] = {
              ...fileStates[fileName],
              isComplete: false,
              isPending: false,
              isError: true,
            }
          }
          isError.value = true
          isPending.value = false
          throw error
        })
    },
  })

  return { ...mutation, progress, isPending, isComplete, isError }
}
