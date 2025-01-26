from ultralytics import YOLO, settings
import torchvision
import wandb
from wandb.integration.ultralytics import add_wandb_callback



settings.update({"wandb": True})
wandb.login()
wandb.init(project="YOLO11n-segmentation", name="segmentation_pavement_cracks")

model = YOLO("./yolo11n-seg.pt")
add_wandb_callback(model, enable_model_checkpointing=True)

results = model.train(
    data="data.segmentation.yaml",
    imgsz=640,
    batch=16,
    workers=8,
    epochs=150,
    device=0,
    project="runs/train",
    name="exp",
    exist_ok=True,
    cache=True,
    plots=True,
    hyp=
)

wandb.finish()