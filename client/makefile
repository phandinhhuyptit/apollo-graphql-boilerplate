deploy-server:
	docker build -t web-image .
	docker-compose up -d

deploy-staging-server:
	docker build -t web-image-dev .
	docker-compose -f docker-compose-dev.yml up -d