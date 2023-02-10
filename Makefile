.PHONY: dev
dev:
	@echo "Starting development server..."
	yarn dev

.PHONY: build
build:
	@echo "Building for production..."
	yarn build

.PHONY: start
start:
	@echo "Starting production server..."
	yarn start

.PHONY: test
test:
	@echo "Running tests..."
	yarn test

.PHONY: lint
lint:
	@echo "Linting..."
	yarn lint

.PHONY: lint-fix
lint-fix:
	@echo "Linting and fixing..."
	yarn lintfix

.PHONY: clean
clean:
	@echo "Cleaning..."
	rm -rf .nuxt dist

.PHONY: verbose-clean
verbose-clean:
	@echo "Cleaning..."
	rm -rf .nuxt dist node_modules
