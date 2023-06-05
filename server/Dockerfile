# syntax=docker/dockerfile:1.4

# Set base image (host OS)
FROM python:3.11-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt /app

# Copy the content of the local src directory to the working directory
COPY . /app

# install Docker tools (cli, buildx, compose) ADDS VULNERABILITIES
# COPY --from=gloursdocker/docker / /

# Install dependencies
RUN apk update && apk add --no-cache build-base musl-dev
RUN pip cache purge
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

# By default, listen on port 8000
EXPOSE 8000/tcp

# Specify the command to run on container start
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]