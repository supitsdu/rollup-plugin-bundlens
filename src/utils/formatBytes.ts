import type { FormatConfig } from "../types"
import { Colors } from "./colors"

/**
 * Default ranges for formatting bytes. For now, we'll just use the default ranges.
 */
const DEFAUL_RANGES: Required<FormatConfig>["ranges"] = [
	{ maxBytes: 16 * 1024, color: Colors.green },
	{ maxBytes: 64 * 1024, color: Colors.yellow },
	{ maxBytes: 120 * 1024, color: Colors.red },
]

export function formatBytes(input: number): string {
	const RANGES = DEFAUL_RANGES
	const UNITS = ["B", "kB", "MB", "GB", "TB", "PB"] as const
	const RESET = "\x1b[39m"
	const bytes = !Number.isFinite(input) || input < 0 ? 0 : input

	let unitIndex = 0
	let size = bytes

	while (size >= 1024 && unitIndex < UNITS.length - 1) {
		size /= 1024
		unitIndex++
	}

	const formatted = new Intl.NumberFormat("en", {
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
	}).format(size)

	const color = RANGES.find(r => bytes <= r.maxBytes)?.color ?? Colors.magenta

	return `${color}${formatted} ${UNITS[unitIndex]}${RESET}`
}
