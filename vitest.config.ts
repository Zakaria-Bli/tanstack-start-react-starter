import { defineConfig } from "vitest/config"

export default defineConfig({
	resolve: { tsconfigPaths: true },
	test: {
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/lib/tests/setup.ts"],
	},
})
