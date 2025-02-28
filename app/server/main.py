from fastapi import Body, FastAPI, Request, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models.detect import Detection, DetectResponse
import os
from ultralytics import YOLO
import cv2

app = FastAPI()

origins = os.environ.get(
    "ALLOWED_ORIGINS", "http://localhost,http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("best.pt")
names = model.model.names

UPLOAD_FOLDER = "uploads"  # TODO: Replace with S3
RESULT_FOLDER = "results"  # TODO: Replace with boto and S3
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)
env = os.environ.get("ENV", "dev")


def debug_log(message: str):
    if env == "debug":
        print(message)


@app.api_route("/", methods=["GET", "POST"])
async def main(request: Request, file: UploadFile | None = File(None)):
    debug_log(f"Request method: {request.method}")

    if request.method == "POST":
        if file is None:
            raise HTTPException(status_code=400, detail="No file uploaded")

        if file.filename == "":
            raise HTTPException(status_code=400, detail="No selected file")

        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        debug_log(f"Saving uploaded file to: {filepath}")

        with open(filepath, "wb") as buffer:
            # TODO: Replace with S3
            buffer.write(await file.read())

        debug_log(f"File saved. Starting prediction on: {filepath}")
        results = model.predict(source=filepath, save=True, conf=0.25)
        debug_log(f"Prediction completed. Results: {results}")

        result_image_path = os.path.join(RESULT_FOLDER, file.filename)
        if results[0].plot() is not None:
            cv2.imwrite(result_image_path, results[0].plot())
            debug_log(f"Result image saved to: {result_image_path}")

        detections = []
        for result in results:
            for box in result.boxes:
                detection = Detection(
                    class_id=int(box.cls),
                    class_name=names[int(box.cls)],
                    confidence=float(box.conf),
                    bbox=box.xyxy.tolist(),  # [x_min, y_min, x_max, y_max]
                )
                detections.append(detection)
                debug_log(f"Detection: {detection}")

        response = DetectResponse(
            message="Detection completed",
            detections=detections,
            result_image=f"/cracks?filename={file.filename}",
        )

        debug_log(f"Response: {response}")
        return response

    if request.method == "GET":
        filename = request.query_params.get("filename")
        debug_log(f"GET request for filename: {filename}")
        if filename:
            result_image_path = os.path.join(RESULT_FOLDER, filename)
            if os.path.exists(result_image_path):
                debug_log(f"Returning result image: {result_image_path}")
                return FileResponse(result_image_path)
        return FileResponse("templates/index.html")
