import { Colors } from "../../src/utils/colors"

describe("Colors", () => {
	describe("color codes", () => {
		it("should have correct color codes", () => {
			expect(Colors.cyan).toBe("\x1b[36m")
			expect(Colors.green).toBe("\x1b[32m")
			expect(Colors.yellow).toBe("\x1b[33m")
			expect(Colors.red).toBe("\x1b[31m")
			expect(Colors.magenta).toBe("\x1b[35m")
			expect(Colors.blue).toBe("\x1b[34m")
		})
	})

	describe("formatting codes", () => {
		it("should have correct formatting codes", () => {
			expect(Colors.bold).toBe("\x1b[1m")
			expect(Colors.dim).toBe("\x1b[2m")
		})
	})

	describe("reset codes", () => {
		it("should have correct reset codes", () => {
			expect(Colors.reset).toBe("\x1b[0m")
			expect(Colors.resetIntensity).toBe("\x1b[22m")
			expect(Colors.resetColor).toBe("\x1b[39m")
		})
	})
})
