all:
	pnpm install -g @microsoft/rush
	rush install
	rush update
	rush build