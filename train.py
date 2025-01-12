from ultralytics import YOLO

model = YOLO("yolo11m.pt")

model.train(
    data="dataset_custom.yaml",
    imgsz=640,
    batch=16,
    workers=8,
    epochs=200,
    device=0,
    weights="yolo11m.pt",
    project="runs/train",
    name="exp",
    entity="ultralytics",
    exist_ok=True,
)
