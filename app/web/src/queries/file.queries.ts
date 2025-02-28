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

  const mutation = useMutation({
    mutationFn: async ({ fileName, file }: { fileName: string; file: File; prefix?: string }) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileName', fileName) // Optional, if backend expects it

      await axios
        .post(`${config.api.url}/cracks`, formData, {
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
          throw error
        })
    },
  })

  return { ...mutation, progress }
}
