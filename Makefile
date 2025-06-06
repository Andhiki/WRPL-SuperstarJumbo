up-dev:
	docker compose -f compose.dev.yaml up --build

down-dev:
	docker compose -f compose.dev.yaml down

logs-dev:
	docker compose -f compose.dev.yaml logs -f

up-prod:
	docker compose -f compose.yml up --build

down-prod:
	docker compose -f compose.yml down

logs-prod:
	docker compose -f compose.yml logs -f

build-image:
	docker build -t lesalmon/wrpl-superstarjumbo:latest -f Dockerfile.prod .

push-image:
	docker push lesalmon/wrpl-superstarjumbo:latest 