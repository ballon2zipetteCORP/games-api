default_target: env

env:
	docker compose -f .devcontainer/docker-compose.yml up
.PHONY: env