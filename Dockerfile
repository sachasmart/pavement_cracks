# docker buildx build --platform linux/amd64 -t fastapi-app .

FROM python:3.12-slim-bookworm AS base
ENV POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"

ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

COPY --from=redboxoss/scuttle:1.3.7 /scuttle /bin/scuttle

FROM base AS builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc g++ curl git

ARG POETRY_VERSION="1.8.3"
RUN curl -sSL https://install.python-poetry.org | python -

WORKDIR $PYSETUP_PATH
COPY ./pyproject.toml ./poetry.lock ./

RUN poetry install --no-dev --no-interaction

FROM base AS final

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends libgl1 libglib2.0-0

COPY --from=builder $VENV_PATH $VENV_PATH
COPY ./app/server .

EXPOSE 8000

#uvicorn main:app --host 0.0.0.0 --port 8000
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
