.PHONY: dev
dev:
	@echo "Starting development server..."
	pnpm dev

.PHONY: build
build:
	@echo "Building for production..."
	pnpm build

.PHONY: start
start:
	@echo "Starting production server..."
	pnpm start

.PHONY: test
test:
	@echo "Running tests..."
	pnpm test

.PHONY: lint
lint:
	@echo "Linting..."
	pnpm lint

.PHONY: lint-fix
lint-fix:
	@echo "Linting and fixing..."
	pnpm lintfix

.PHONY: clean
clean:
	@echo "Cleaning..."
	rm -rf .nuxt dist

.PHONY: verbose-clean
verbose-clean:
	@echo "Cleaning..."
	rm -rf .nuxt dist node_modules
