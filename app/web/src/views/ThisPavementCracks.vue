<template>
  <VCard style="border: 1px solid #e0e0e0">
    <VCardTitle>
      <TextTitle variant>Upload Pavement Cracks</TextTitle>
    </VCardTitle>
    <VCardText>
      <FileUpload
        name="pavementCracks"
        :data="uploadFile"
        @add:file="handleAddFile"
        @remove-file="removeFile"
      />
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
</template>
<script lang="ts" setup>
import { FileUpload } from '@components/form'
import { TextTitle } from '@components/typography'
import type { ImportFileType } from '@components/form/FileUpload.vue'
import { ref, type Ref } from 'vue'

const uploadFile: Ref<ImportFileType | null> = ref(null)
const isError = ref(false)
const isPending = ref(false)

const reset = () => {
  isError.value = false
  isPending.value = false
}

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

  console.log('Uploading file:', uploadFileValue.file)
}
</script>
