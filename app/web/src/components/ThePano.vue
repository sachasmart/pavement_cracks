<template>
  <div id="viewer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { Viewer, utils } from '@photo-sphere-viewer/core'
import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin'

const psViewer: Ref<Viewer | null> = ref(null)
let isInit = true

const animatedValues = {
  pitch: { start: -Math.PI / 2, end: 0 },
  yaw: { start: Math.PI / 2, end: 0 },
  zoom: { start: 0, end: 50 },
  maxFov: { start: 130, end: 90 },
  fisheye: { start: 2, end: 0 },
}

const onloadImg = () => {
  psViewer.value = new Viewer({
    container: document.querySelector('#viewer'),
    panorama: 'http://192.168.2.5:9000/test/stereo.jpg',
    defaultPitch: animatedValues.pitch.start,
    defaultYaw: animatedValues.yaw.start,
    defaultZoomLvl: animatedValues.zoom.start,
    maxFov: animatedValues.maxFov.start,
    fisheye: animatedValues.fisheye.start,
    plugins: [
      [
        AutorotatePlugin,
        {
          autostartDelay: null,
          autostartOnIdle: false,
          autorotatePitch: 0,
        },
      ],
    ],
  })

  const autorotate = psViewer.value.getPlugin(AutorotatePlugin) // Access plugin after initializing psViewer

  psViewer.value.addEventListener('click', ({ data }) => {
    if (isInit) {
      intro(data.pitch, data.yaw, autorotate)
    }
  })

  psViewer.value.addEventListener(
    'ready',
    () => {
      psViewer.value!.navbar.hide()

      setTimeout(() => {
        if (isInit) {
          intro(animatedValues.pitch.end, animatedValues.yaw.end, autorotate)
        }
      }, 5000)
    },
    { once: true },
  )
}

onMounted(async () => {
  onloadImg()
})

const intro = (pitch, yaw, autorotate) => {
  isInit = false
  autorotate.stop()
  psViewer.value!.navbar.hide()

  new utils.Animation({
    properties: {
      ...animatedValues,
      pitch: { start: animatedValues.pitch.start, end: pitch },
      yaw: { start: animatedValues.yaw.start, end: yaw },
    },
    duration: 2500,
    easing: 'inOutQuad',
    onTick: (properties) => {
      psViewer.value!.setOptions({
        fisheye: properties.fisheye,
        maxFov: properties.maxFov,
      })
      psViewer.value!.rotate({ yaw: properties.yaw, pitch: properties.pitch })
      psViewer.value!.zoom(properties.zoom)
    },
  }).then(() => {
    autorotate.start()
    psViewer.value!.navbar.show()
    psViewer.value!.setOptions({
      mousemove: true,
      mousewheel: true,
    })
  })
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5/index.css';

#viewer {
  width: 100vh;
  height: 50vh;
}
</style>
