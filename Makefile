all:
	pnpm install -g @microsoft/rush
	rush install
	rush build