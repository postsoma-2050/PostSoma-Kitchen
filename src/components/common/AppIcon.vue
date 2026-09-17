<template>
  <component
    :is="iconComponent"
    :size="normalizedSize"
    color="currentColor"
    class-name="app-icon"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="decorative ? undefined : label"
    focusable="false"
  />
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import type { AppIconName } from '@/types/icon'
import {
  RiAddLine,
  RiAlertLine,
  RiArchive2Line,
  RiArrowDownSLine,
  RiArrowGoBackLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiBarChartBoxLine,
  RiBook3Line,
  RiBowlLine,
  RiCake3Line,
  RiCameraLine,
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleLine,
  RiCloseLine,
  RiDatabase2Line,
  RiDeleteBin6Line,
  RiDownload2Line,
  RiDraftLine,
  RiEarthLine,
  RiEditLine,
  RiErrorWarningLine,
  RiExternalLinkLine,
  RiFileList3Line,
  RiFileTextLine,
  RiFilter3Line,
  RiFireLine,
  RiFlaskLine,
  RiFlowChart,
  RiFocus2Line,
  RiFullscreenLine,
  RiGitBranchLine,
  RiGlobalLine,
  RiGobletLine,
  RiGroupLine,
  RiGuideLine,
  RiHistoryLine,
  RiInformationLine,
  RiKnifeLine,
  RiLayoutGridLine,
  RiLeafLine,
  RiLightbulbLine,
  RiLinkM,
  RiLoader4Line,
  RiLock2Line,
  RiMagicLine,
  RiMap2Line,
  RiMenuLine,
  RiRestaurant2Line,
  RiRobot2Line,
  RiSave3Line,
  RiScales3Line,
  RiSearchLine,
  RiSeedlingLine,
  RiSettings3Line,
  RiShieldCheckLine,
  RiShieldLine,
  RiSparkling2Line,
  RiSteamLine,
  RiStethoscopeLine,
  RiSubtractLine,
  RiSwapLine,
  RiTableLine,
  RiTempHotLine,
  RiTimer2Line,
  RiUploadCloud2Line,
  RiUserLine,
  RiEyeLine,
  RiZoomInLine,
} from '@remixicon/vue'

const iconMap: Record<AppIconName, Component> = {
  add: RiAddLine,
  alert: RiAlertLine,
  archive: RiArchive2Line,
  'arrow-down': RiArrowDownSLine,
  'arrow-left': RiArrowLeftLine,
  'arrow-right': RiArrowRightLine,
  'arrow-right-up': RiArrowRightUpLine,
  back: RiArrowGoBackLine,
  book: RiBook3Line,
  bowl: RiBowlLine,
  branch: RiGitBranchLine,
  cake: RiCake3Line,
  camera: RiCameraLine,
  chart: RiBarChartBoxLine,
  check: RiCheckboxCircleLine,
  circle: RiCheckboxBlankCircleFill,
  close: RiCloseLine,
  database: RiDatabase2Line,
  delete: RiDeleteBin6Line,
  download: RiDownload2Line,
  draft: RiDraftLine,
  earth: RiEarthLine,
  edit: RiEditLine,
  error: RiErrorWarningLine,
  'external-link': RiExternalLinkLine,
  eye: RiEyeLine,
  file: RiFileTextLine,
  filter: RiFilter3Line,
  fire: RiFireLine,
  flask: RiFlaskLine,
  flow: RiFlowChart,
  focus: RiFocus2Line,
  fullscreen: RiFullscreenLine,
  global: RiGlobalLine,
  goblet: RiGobletLine,
  group: RiGroupLine,
  guide: RiGuideLine,
  history: RiHistoryLine,
  info: RiInformationLine,
  knife: RiKnifeLine,
  layout: RiLayoutGridLine,
  leaf: RiLeafLine,
  lightbulb: RiLightbulbLine,
  link: RiLinkM,
  loader: RiLoader4Line,
  lock: RiLock2Line,
  magic: RiMagicLine,
  map: RiMap2Line,
  menu: RiMenuLine,
  restaurant: RiRestaurant2Line,
  robot: RiRobot2Line,
  save: RiSave3Line,
  scale: RiScales3Line,
  search: RiSearchLine,
  seedling: RiSeedlingLine,
  settings: RiSettings3Line,
  shield: RiShieldLine,
  'shield-check': RiShieldCheckLine,
  sparkles: RiSparkling2Line,
  steam: RiSteamLine,
  steps: RiFileList3Line,
  stethoscope: RiStethoscopeLine,
  subtract: RiSubtractLine,
  success: RiCheckboxCircleLine,
  swap: RiSwapLine,
  table: RiTableLine,
  temperature: RiTempHotLine,
  timer: RiTimer2Line,
  upload: RiUploadCloud2Line,
  user: RiUserLine,
  'zoom-in': RiZoomInLine,
}

const props = withDefaults(defineProps<{
  name: AppIconName
  size?: number | string
  decorative?: boolean
  label?: string
}>(), {
  size: 20,
  decorative: true,
  label: undefined,
})

const iconComponent = computed(() => iconMap[props.name])
const normalizedSize = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)
</script>

<style scoped>
.app-icon {
  display: inline-block;
  flex: none;
  vertical-align: -0.125em;
}
</style>
