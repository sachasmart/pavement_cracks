from fastapi import Body, FastAPI, Request, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from typing import List
from models.detect import Detection, DetectResponse
import os
from ultralytics import YOLO
import cv2


app = FastAPI()

model = YOLO("best.pt")
names = model.model.names

UPLOAD_FOLDER = "uploads"  # TODO: Replace with S3
RESULT_FOLDER = "results"  # TODO: Replace with boto and S3
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)


@app.api_route("/cracks", methods=["GET", "POST"])
async def main(request: Request, file: UploadFile | None = File(...)):
    if request.method == "POST":
        if file is None:
            raise HTTPException(status_code=400, detail="No file uploaded")

        if file.filename == "":
            raise HTTPException(status_code=400, detail="No selected file")

        filepath = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(filepath, "wb") as buffer:
            # TODO: Replace with S3
            buffer.write(await file.read())

        results = model.predict(source=filepath, save=True, conf=0.25)

        result_image_path = os.path.join(RESULT_FOLDER, file.filename)
        if results[0].plot() is not None:
            cv2.imwrite(result_image_path, results[0].plot())

        detections = []
        for result in results:
            for box in result.boxes:
                detections.append(
                    Detection(
                        class_id=int(box.cls),
                        class_name=names[int(box.cls)],
                        confidence=float(box.conf),
                        bbox=box.xyxy.tolist(),  # [x_min, y_min, x_max, y_max]
                    )
                )
                print(box.xyxy.tolist())

        response = DetectResponse(
            message="Detection completed",
            detections=detections,
            result_image=f"/results/{file.filename}",
        )

        return response
    if request.method == "GET":
        filename = request.query_params.get("filename")
        if filename:
            result_image_path = os.path.join(RESULT_FOLDER, filename)
            if os.path.exists(result_image_path):
                return FileResponse(result_image_path)
        return FileResponse("templates/index.html")
