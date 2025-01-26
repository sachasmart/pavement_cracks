from ultralytics import YOLO, settings
import torchvision
import wandb
from wandb.integration.ultralytics import add_wandb_callback

settings.update({"wandb": True})
wandb.login()
wandb.init(project="YOLO11m-segmentation", name="segmentation_pavement_cracks")

model = YOLO("./yolo11m-seg.pt")
add_wandb_callback(model, enable_model_checkpointing=True)

results = model.train(
    data="data.segmentation.yaml",
    imgsz=640,
    batch=16,
    workers=8,
    epochs=150,
    device=0,
    project="runs/train",
    name="exp1",
    exist_ok=True,
    cache=True,
    plots=True,
    # test
    lr0=0.01,  # initial learning rate (SGD=1E-2, Adam=1E-3)
    lrf=0.1,  # final OneCycleLR learning rate (lr0 * lrf)
    momentum=0.937,  # SGD momentum/Adam beta1
    weight_decay=0.0005,  # optimizer weight decay 5e-4
    warmup_epochs=3.0,  # warmup epochs (fractions ok)
    warmup_momentum=0.8,  # warmup initial momentum
    warmup_bias_lr=0.1,  # warmup initial bias lr
    box=0.05,  # box loss gain
    cls=0.3,  # cls loss gain
    kobj=0.7,  # obj loss gain (scale with pixels)
    iou=0.20,  # IoU training threshold
    # anchors=3  # anchors per output layer (0 to ignore)
    hsv_h=0.015,  # image HSV-Hue augmentation (fraction)
    hsv_s=0.7,  # image HSV-Saturation augmentation (fraction)
    hsv_v=0.4,  # image HSV-Value augmentation (fraction)
    degrees=0.0,  # image rotation (+/- deg)
    translate=0.1,  # image translation (+/- fraction)
    scale=0.9,  # image scale (+/- gain)
    shear=0.0,  # image shear (+/- deg)
    perspective=0.0,  # image perspective (+/- fraction), range 0-0.001
    flipud=0.0,  # image flip up-down (probability)
    fliplr=0.5,  # image flip left-right (probability)
    mosaic=1.0,  # image mosaic (probability)
    mixup=0.1,  # image mixup (probability)
    copy_paste=0.1, # segment copy-paste (probability)
)

wandb.finish()