import type { ParsedPath } from "node:path"
import type { BundleMetrics, BundlesOutput } from "../types"
import { Colors } from "./colors"
import { formatBytes } from "./formatBytes"

export namespace Logger {
	const ringSymbol = "⋯".repeat(8)

	const format = {
		heading: (text: string) => `\n${Colors.cyan}${Colors.bold}${ringSymbol}( ${text} )${ringSymbol}${Colors.reset}\n`,
		row: (label: string, value: string) => `\n ${Colors.dim}${label} ${Colors.reset}${value}`,
		path: (parsedPath: ParsedPath) => `${Colors.dim}( ${parsedPath.dir}/${parsedPath.base} )${Colors.reset}`,
		size: (size: number, gzip: number) => `${formatBytes(size)} ${Colors.dim}→ ${formatBytes(gzip)}${Colors.reset}`,
	}

	export const info = (bundles: BundleMetrics | BundlesOutput[]) => {
		if (Array.isArray(bundles)) {
			return console.info(
				...bundles.map(({ parsedPath, size, gzip }) =>
					format.row("☍", `${format.size(size, gzip)} ${format.path(parsedPath)}`),
				),
			)
		}

		const bundleDetails = (bundles as BundleMetrics).bundleDetails

		console.info(
			format.heading("Bundle Details"),
			...[
				["Total Chunks", bundleDetails.chunks],
				["Total Assets", bundleDetails.assets],
				["Total Size", `${format.size(bundleDetails.size, bundleDetails.gzip)}`],
			].map(([label, value]) => format.row(`${label}:`, `${value}`)),
			"\n",
		)
	}
}
