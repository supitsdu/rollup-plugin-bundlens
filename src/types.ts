import type path from "node:path"

export interface BundlesOutput {
	parsedPath: path.ParsedPath
	size: number
	gzip: number
}

export interface BundleMetrics {
	bundles: BundlesOutput[]
	bundleDetails: {
		chunks: number
		assets: number
		size: number
		gzip: number
	}
}

export type ActiveBundleMetricPlugins = string[]

export type ColorCode = `\x1b[${number}m`

export interface FormatConfig {
	colors?: boolean
	ranges?: { maxBytes: number; color: ColorCode }[]
}
