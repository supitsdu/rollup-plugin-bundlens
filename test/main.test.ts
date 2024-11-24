import * as mainExports from "../src/main"

describe("main.ts exports", () => {
	it("should export all required modules", () => {
		const exportedModules = Object.keys(mainExports)

		const expectedExports = ["reportDetails"]

		expectedExports.forEach(exportName => {
			expect(mainExports).toHaveProperty(exportName)
		})

		expect(exportedModules.length).toBe(expectedExports.length)
	})
})
