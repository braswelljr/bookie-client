# check for eslint
HASESLINT := $(shell which eslint 2> /dev/null)
# check for prettier
HASPRETTIER := $(shell which prettier 2> /dev/null)
# check for stylelint
HASSTYLELINT := $(shell which stylelint 2> /dev/null)

# check for eslint
ifdef HASESLINT
	ESLINT := eslint
else
	ESLINT := npx eslint
endif

# check for prettier
ifdef HASPRETTIER
	PRETTIER := prettier
else
	PRETTIER := npx prettier
endif

# check for stylelint
ifdef HASSTYLELINT
	STYLELINT := stylelint
else
	STYLELINT := npx stylelint
endif

.PHONY: dev
dev:
	@make clean
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
