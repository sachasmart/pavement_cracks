# Pavement Cracks

## Dataset

- [Download](https://figshare.com/articles/dataset/Pavement_cracks_from_UAV_imagery-1388/25103138?file=44293022)

## Development

```bash
poetry install
poetry run uvicorn app.main:app --reload
# or
poetry run fastapi dev main.py
```

## Deployment

- Build

```bash
docker buildx build --platform linux/amd64 -t fastapi-app .
```

- Create [fission](https://fission.io/) function

```bash
k apply -f /Users/sachasmart/Documents/second_brain/Github/pavement_cracks/deployment/fission/specs/registry.secrets.yaml
fission fn run-container --name=cracks --image registry.sachasmart.com/pavement_cracks:latest --port 8000 --imagepullsecret "registry-secret"
```
