---
title: "Dev Containers"
description: "I tried making my development setup portable with dev containers. It worked, but there was one thing that annoyed me."
publishDate: "2026 • 07"
tags: ["Docker", "Coding"]
---

## Dev Containers Sound Awesome

The idea is simple and honestly pretty cool. Instead of setting up ruby, node, postgres clients, random shell tools and all the other stuff again and again on every machine, put the development environment inside a container.

So when I open the project, I am not depending too much on the host machine. The container has the tools. The project has the config. I just enter it and work.

At least that is the dream.

## The devcontainer.json

The main file is `devcontainer.json`. It tells tools that support dev containers how to open the project inside a container.

This was the kind of config I was trying:

```json
{
  "name": "tagntrac-infra",
  "dockerComposeFile": "docker-compose.yml",
  "service": "dev",
  "workspaceFolder": "/workspace/tagntrac-infra",
  "remoteUser": "saipr",
  "forwardPorts": [3000, 3001],
  "postCreateCommand": "/workspace/tagntrac-infra/.devcontainer/install-runtimes.sh",
  "postStartCommand": ["git", "config", "--global", "--add", "safe.directory", "*"]
}
```

The important part for me was this:

```json
"service": "dev"
```

When using docker compose, you might have many containers like postgres, redis, kafka, etc. But `service` tells the tool which container is the actual development container. In my case, enter the `dev` container, not postgres, not redis, not some random dependency container.

The official reference is here if I forget this again: [devcontainer.json reference&#xf46c;](https://containers.dev/implementors/json_reference/)

## Dockerfile Is Still The Base

The `devcontainer.json` is the metadata, but the actual system still comes from the image. That means either using an existing image or building one with a Dockerfile.

Dockerfile is basically the recipe:

```dockerfile
FROM ubuntu:latest

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update

USER saipr
WORKDIR /home/saipr/dev-dotfiles
```

`FROM` decides the base image, `ENV` sets environment variables, `RUN` installs or changes stuff, `USER` decides who commands run as, and `WORKDIR` decides where the following commands happen.

Nothing too magical there. It is just building a small system.

## My Attempt

I built a base devbox image from my dotfiles: [dev-dotfiles&#xf46c;](https://github.com/saipr0/dev-dotfiles)

Then my work dev container was built on top of that image. And honestly, that part felt really nice. It is satisfying knowing that the shell, tools and base setup are the same wherever I run it.

I also tried it with DevPod:

```sh
devpod provider add docker
devpod provider use docker
devpod ide use none
devpod context set-options -o SSH_AGENT_FORWARDING=true
```

This gave me the kind of setup I like: use the container as the machine, connect to it, and keep my editor/terminal workflow.

## The Thing That Threw Me Off

The annoying part was filesystem latency.

The code lives on the host machine, but the development is happening inside the container. Accessing files through that boundary did not feel as fast as working directly on the host filesystem.

And maybe this sounds small, but when your workflow is terminal + neovim + ripgrep + jumping around files, tiny delays become very noticeable. It breaks the flow.

That was the main thing that made me pause.

## So Is It Worth It?

I still think dev containers are a great idea. For teams, onboarding, reproducible environments, or projects with annoying dependencies, they make a lot of sense.

But for my personal setup, where I already care way too much about the feel of the terminal and filesystem speed, I am not fully sold yet.

I like the idea of carrying my system inside the project. I just don't want it to feel slower than my actual system.

Maybe I will come back to this later. For now, dev containers are in the "this is cool, but not frictionless enough for me" bucket.
