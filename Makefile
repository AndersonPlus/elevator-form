.PHONY: install dev

.DEFAULT_GOAL := dev

install:
	@echo "Installing pnpm..."
	@npm install -g pnpm@9.15.4
	@echo "Installing dependencies..."
	@pnpm install

dev:
	@echo "Starting development server..."
	@pnpm dev 