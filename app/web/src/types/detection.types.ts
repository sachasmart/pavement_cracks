export type Detection = {
  class_id: number
  class_name: string
  confidence: number
  bbox: [number, number, number, number][]
}

export type DetectionResult = {
  message: string
  detections: Detection[]
  result_image: string
}
