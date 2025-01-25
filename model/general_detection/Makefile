tensorboard:
	@echo "Starting Tensorboard..."
	@ip_address=$$(hostname -I | cut -d' ' -f1); \
	tensorboard --logdir=runs/train --host=$$ip_address --port=6006
