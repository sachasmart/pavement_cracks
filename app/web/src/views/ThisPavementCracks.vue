<template>
  <VCard style="border: 1px solid #e0e0e0" class="pa-4 ma-4">
    <VCard>
      <VCardTitle>
        <TextTitle variant>Upload Pavement Cracks</TextTitle>
      </VCardTitle>
      <VCardText>
        <FileUpload
          v-if="!isComplete"
          name="pavementCracks"
          :data="uploadFile"
          @add:file="handleAddFile"
          @remove-file="removeFile"
        >
          <template v-if="isPending" #progress>
            <VProgressCircular :model-value="progress" />
          </template>
        </FileUpload>
        <VImg v-if="isComplete" :src="resultUrl">
          <template v-slot:placeholder>
            <div class="d-flex justify-center align-center" style="height: 100%">
              <VProgressCircular indeterminate />
            </div>
          </template>
        </VImg>
      </VCardText>
      <VCardActions class="align-self-center">
        <VBtn
          class="my-2"
          block
          color="primary"
          :disabled="!uploadFile || isPending"
          :loading="isPending"
          type="submit"
          variant="flat"
          @click="handleUpload"
        >
          {{ isError ? 'Retry' : 'Upload' }}
        </VBtn>
      </VCardActions>
    </VCard>
    <VDivider class="my-4 mx-2" />
    <TextBody> TODO: {{ ABOUT }} </TextBody>
  </VCard>
</template>
<script lang="ts" setup>
import { FileUpload } from '@components/form'
import { TextTitle, TextBody } from '@components/typography'
import type { ImportFileType } from '@components/form/FileUpload.vue'
import { useFileUploadForProject } from '@queries/file.queries'
import { ref, type Ref, computed } from 'vue'
import { ABOUT } from './constants/about.ts'
import config from '@config'

const base_url = config.api.url
const uploadFile: Ref<ImportFileType | null> = ref(null)
const { mutate, progress, isPending, isComplete, isError, resultImage } = useFileUploadForProject()

const removeFile = () => {
  reset()
  uploadFile.value = null
}
const handleAddFile = (file: File, fileName: string, fileUrl: string) => {
  uploadFile.value = { type: 'file', file, fileName, fileUrl }
}

const handleUpload = () => {
  const uploadFileValue = uploadFile.value
  if (uploadFileValue?.type != 'file') {
    return
  }

  mutate({
    file: uploadFileValue.file,
    fileName: uploadFileValue.fileName,
  })
}

const resultUrl = computed(() => (resultImage.value ? `${base_url}/${resultImage.value}` : ''))
</script>
