from ultralytics import YOLO, settings
import torchvision
import wandb


settings.update({"wandb": True})
wandb.login()
wandb.init(project="YOLO11m", name="pavement_cracks")

model = YOLO("yolo11m.pt")

results = model.train(
    data="data.general_detection.yaml",
    imgsz=640,
    batch=16,
    workers=8,
    epochs=175,
    device=0,
    project="runs/train",
    name="exp",
    exist_ok=True,
    cache=True,
    plots=True,
)

wandb.finish()
