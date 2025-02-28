<template>
  <div class="d-flex align-center justify-center w-100">
    <VSheet
      v-if="!data"
      class="d-flex align-center justify-center w-100 border-md border-dashed cursor-pointer pa-2"
      :disabled="disabled"
      elevation="0"
      height="256"
      rounded
      @dragleave="onDragLeave"
      @dragover="onDragOver"
      @drop="onDrop"
    >
      <div class="d-flex flex-column align-center justify-center pa-6">
        <VIcon alt="Add Image Icon" class="mb-4" :icon="mdiFileImagePlus" max-width="100" />
        <p class="text-sm grey--text text--darken-1 mb-2">
          <span class="font-weight-bold orange--text">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs grey--text text--darken-2">PNG, JPG, GIF, TIF up to {{ maxSize }}MB</p>
      </div>
      <input
        :id="name"
        :accept="accept"
        class="file-input"
        :disabled="disabled"
        type="file"
        @change="onFileChanged"
      />
    </VSheet>
    <VSheet
      v-else
      class="d-flex align-center justify-center w-100 border-md border-dashed cursor-pointer"
      height="256"
      outlined
      rounded
    >
      <VIcon
        class="position-absolute top-0 right-0 elevation-24"
        :class="{
          'cursor-pointer': !disabled,
          'cursor-not-allowed': disabled,
        }"
        :icon="mdiClose"
        @click="!disabled ? emit('removeFile', 'fileUrl') : undefined"
      />

      <template v-if="data.type === 'file'">
        <VImg class="w-100 h-100" contain :src="data.fileUrl" />
      </template>
      <template v-else>
        <VImg class="w-100 h-100" contain :src="data.url" />
      </template>
      <div
        v-if="$slots.progress"
        class="position-absolute top-0 left-0 w-100 h-100 d-flex align-center justify-center"
        style="background-color: rgba(255, 255, 255, 0.5)"
      >
        <slot name="progress" />
      </div>
    </VSheet>
  </div>
</template>

<script lang="ts" setup>
import { mdiClose, mdiFileImagePlus } from '@mdi/js'
import { ref } from 'vue'

export type ImportFileType =
  | { type: 'url'; url: string; fileName: string }
  | { type: 'file'; file: File; fileUrl: string; fileName: string }
  | null

type FileUploadProps = {
  disabled?: boolean
  name: string
  /** max size of the file in MB */
  maxSize?: number
  accept?: string
  data: ImportFileType
}
const ONE_MB_IN_BYTES = 1048576

const props = withDefaults(defineProps<FileUploadProps>(), {
  maxSize: 10,
  accept: '.jpg, .gif, .png, .tif, .jpeg',
})

const emit = defineEmits<{
  (event: 'removeFile', url: string): void
  (event: 'add:file', file: File, fileName: string, fileUrl: string): void
}>()

const active = ref(false)
const onDragOver = (event: Event) => {
  event.preventDefault()
  active.value = true
}
const onDragLeave = (event: Event) => {
  event.preventDefault()
  active.value = false
}
const onFileChanged = (event: Event) => {
  event.preventDefault()
  active.value = false
  const target = event.target as HTMLInputElement
  const file: File = (target.files as FileList)[0]
  if (target) {
    target.value = '' //To allow uploading same file
  }
  if (file) {
    addFile(file)
  }
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  active.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    addFile(file)
  }
}

const addFile = (fileParam: File) => {
  console.log('here', fileParam)
  if (fileParam.size > props.maxSize * ONE_MB_IN_BYTES) {
    console.log(`Image size should be less than ${props.maxSize}MB`)
    return
  }
  emit(
    'add:file',
    fileParam,
    `${Date.now()}-${Math.floor(Math.random() * 5000)}-${fileParam.name}`,
    URL.createObjectURL(fileParam),
  )
}
</script>

<style scoped>
.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
