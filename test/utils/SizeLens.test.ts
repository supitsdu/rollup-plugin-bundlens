import { sizeLens } from "../../src/utils/SizeLens"

describe("sizeLens", () => {
	it("should correctly calculate raw and gzipped sizes", async () => {
		const input = "a".repeat(120 * 1024)
		const result = await sizeLens(input)

		expect(result.size).toBe(122880)
		expect(result.gzip).toBeGreaterThan(0)
		expect(result.gzip).toBeLessThan(result.size)
	})

	it("should return consistent sizes through getSizes method", async () => {
		const input = "Test string for compression"
		const result = await sizeLens(input)
		const sizes = result.getSizes()

		expect(sizes.size).toBe(result.size)
		expect(sizes.gzip).toBe(result.gzip)
	})

	it("should handle empty string", async () => {
		const input = ""
		const result = await sizeLens(input)

		expect(result.size).toBe(0)
		expect(result.gzip).toBeGreaterThan(0) // gzip adds some headers even for empty input
	})

	it("should handle long strings", async () => {
		const input = "a".repeat(1024 * 1024)
		const result = await sizeLens(input)

		expect(result.size).toBe(1048576)
		expect(result.gzip).toBeGreaterThan(0)
		expect(result.gzip).toBeLessThan(result.size)
	})
})
