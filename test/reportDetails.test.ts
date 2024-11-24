import { reportDetails } from "../src/reportDetails"
import { Logger } from "../src/utils/Logger"

// Mock dependencies
jest.mock("node:path", () => ({
	join: (...args: string[]) => args.join("/"),
	parse: (filePath: string) => ({
		root: "",
		dir: "",
		base: filePath,
		name: filePath.split(".")[0],
		ext: `.${filePath.split(".")[1]}`,
	}),
	dirname: (path: string) => path,
	basename: (path: string) => path,
}))

jest.mock("../src/utils/Logger", () => ({
	Logger: {
		info: jest.fn(),
	},
}))

describe("reportDetails", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should create a plugin with correct name", () => {
		const plugin = reportDetails()
		expect(plugin.name).toBe("bundle-metrics")
	})

	it("should handle generateBundle for chunks", async () => {
		const plugin = reportDetails()
		const bundle = {
			"main.js": {
				type: "chunk",
				fileName: "main.js",
				code: 'console.log("test")',
			},
		}
		const options = { file: "dist/main.js" }

		// @ts-expect-error - Testing private method
		await plugin?.generateBundle(options, bundle)

		// @ts-expect-error - Testing private method
		plugin.closeBundle()
		expect(Logger.info).toHaveBeenCalledTimes(1)
	})

	it("should handle generateBundle for assets", async () => {
		const plugin = reportDetails()
		const bundle = {
			"style.css": {
				type: "asset",
				fileName: "style.css",
				source: ".test { color: red; }",
			},
		}
		const options = { dir: "dist" }

		// @ts-expect-error - Testing private method
		await plugin.generateBundle(options, bundle)

		// @ts-expect-error - Testing private method
		plugin.closeBundle()
		expect(Logger.info).toHaveBeenCalledTimes(1)
	})

	it("should handle multiple plugins instances correctly", () => {
		const plugin1 = reportDetails()
		const plugin2 = reportDetails()

		// @ts-expect-error - Testing private method
		plugin1.closeBundle()
		expect(Logger.info).toHaveBeenCalledTimes(1)

		// @ts-expect-error - Testing private method
		plugin2.closeBundle()
		expect(Logger.info).toHaveBeenCalledTimes(2)
	})
})
