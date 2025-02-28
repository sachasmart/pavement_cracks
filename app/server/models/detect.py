from pydantic import BaseModel


class Detection(BaseModel):
    class_id: int
    class_name: str
    confidence: float
    bbox: list[list[float]]


class DetectResponse(BaseModel):
    message: str
    detections: list[Detection]
    result_image: str
