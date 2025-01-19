from ultralytics import YOLO

model = YOLO("runs/train/exp/weights/best.pt") 

results = model.predict(
    source="test.jpg",  # Image or video file
    conf=0.25,                       # Confidence threshold
    iou=0.5,                         # IoU threshold for NMS
    imgsz=640,                       # Image size
    device=0,                        # Device to use (GPU: 0 or CPU: "cpu")
    save=True,                       # Save results
    save_txt=True,                   # Save detection results in .txt format
)

for result in results:
    print(result) 

# for img in results.imgs:
#     img.show()  # Display the image with detected bounding boxes
