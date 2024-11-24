import { Colors } from "../../src/utils/colors"
import { formatBytes } from "../../src/utils/formatBytes"

describe("formatBytes", () => {
	it("should format bytes correctly with appropriate units", () => {
		expect(formatBytes(0)).toBe(`${Colors.green}0 B${"\x1b[39m"}`)
		expect(formatBytes(1023)).toBe(`${Colors.green}1,023 B${"\x1b[39m"}`)
		expect(formatBytes(1024)).toBe(`${Colors.green}1 kB${"\x1b[39m"}`)
		expect(formatBytes(1024 * 1024)).toBe(`${Colors.magenta}1 MB${"\x1b[39m"}`)
		expect(formatBytes(1024 * 1024 * 1024)).toBe(`${Colors.magenta}1 GB${"\x1b[39m"}`)
	})

	it("should use correct colors based on size ranges", () => {
		// Under 16KB - green
		expect(formatBytes(15 * 1024)).toBe(`${Colors.green}15 kB${"\x1b[39m"}`)
		// Between 16KB and 64KB - yellow
		expect(formatBytes(32 * 1024)).toBe(`${Colors.yellow}32 kB${"\x1b[39m"}`)
		// Between 64KB and 120KB - red
		expect(formatBytes(100 * 1024)).toBe(`${Colors.red}100 kB${"\x1b[39m"}`)
		// Above 120KB - magenta
		expect(formatBytes(150 * 1024)).toBe(`${Colors.magenta}150 kB${"\x1b[39m"}`)
	})

	it("should handle edge cases", () => {
		expect(formatBytes(-1)).toBe(`${Colors.green}0 B${"\x1b[39m"}`)
		expect(formatBytes(Infinity)).toBe(`${Colors.green}0 B${"\x1b[39m"}`)
		expect(formatBytes(NaN)).toBe(`${Colors.green}0 B${"\x1b[39m"}`)
	})

	it("should format decimals correctly", () => {
		expect(formatBytes(1536)).toBe(`${Colors.green}1.5 kB${"\x1b[39m"}`)
		expect(formatBytes(1.5 * 1024 * 1024)).toBe(`${Colors.magenta}1.5 MB${"\x1b[39m"}`)
	})
})
