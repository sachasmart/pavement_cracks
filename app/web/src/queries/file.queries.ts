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
      await axios
        .post(`${config.api.url}/cracks`, file, {
          headers: {
            'Content-Type': file.type,
          },
          onUploadProgress: (error) => {
            if (!error.progress) {
              progress.value = 0
              if (fileStates) {
                fileStates[fileName].progress = 0
              }
              return
            }
            if (fileStates) {
              fileStates[fileName].progress = e.progress * 100
            }
            progress.value = error.progress * 100
          },
        })
        .then((response) => {
          if (fileStates) {
            fileStates[fileName] = { ...fileStates[fileName], isComplete: true, isPending: false }
          }
          return response
        })
        .catch((error: unknown) => {
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
      return getUrl
    },
  })
  return { ...mutation, progress }
}
