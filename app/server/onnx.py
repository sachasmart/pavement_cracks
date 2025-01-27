from ultralytics import YOLO


model = YOLO("./best.pt")
names = model.model.names
model.export(format="onnx", dynamic=True)
