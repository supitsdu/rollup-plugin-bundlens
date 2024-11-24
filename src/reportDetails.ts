import path from "node:path"
import type { Plugin } from "rollup"
import type { ActiveBundleMetricPlugins, BundleMetrics } from "./types"
import { Logger } from "./utils/Logger"
import { sizeLens } from "./utils/SizeLens"

const SHARED_METRICS: BundleMetrics = {
	bundles: [],
	bundleDetails: {
		chunks: 0,
		assets: 0,
		size: 0,
		gzip: 0,
	},
}

const ActivePluginsList: ActiveBundleMetricPlugins = []

/**
 * A Rollup plugin that collects and logs bundle metrics such as the number of chunks, assets, and their sizes.
 *
 * @returns {Plugin} The Rollup plugin object.
 *
 * @example
 * import { reportDetails } from 'rollup-plugin-bundlens';
 *
 * export default {
 *   plugins: [reportDetails()],
 * };
 *
 * @remarks
 * This plugin collects metrics for each asset and chunk in the bundle, including their parsed paths, sizes, and gzip sizes.
 * The collected metrics are logged using the `Logger` when the bundle is closed.
 *
 * @since 0.1.0
 */
export function reportDetails(): Plugin {
	ActivePluginsList.push(`${reportDetails.name}-${ActivePluginsList.length}`)

	const metrics: BundleMetrics = {
		bundles: [],
		bundleDetails: {
			chunks: 0,
			assets: 0,
			size: 0,
			gzip: 0,
		},
	}

	return {
		name: "bundle-metrics",
		async generateBundle(options, bundle) {
			const getBundlePath = (item: any) =>
				item.type === "asset"
					? item.fileName
					: path.join(options.dir || path.dirname(options.file || ""), item.fileName)

			for (const item of Object.values(bundle)) {
				const { gzip, size } = await sizeLens(item.type === "asset" ? item.source.toString() : item.code)
				const parsedPath = path.parse(getBundlePath(item))

				metrics.bundles.push({ parsedPath, size, gzip })

				if (item.type === "asset") {
					SHARED_METRICS.bundleDetails.assets++
					continue
				}

				SHARED_METRICS.bundleDetails.chunks++

				if (item.fileName === path.basename(options.file || "")) {
					SHARED_METRICS.bundleDetails.size += size
					SHARED_METRICS.bundleDetails.gzip += gzip
					SHARED_METRICS.bundles.push({ parsedPath, size, gzip })
				}
			}
		},
		closeBundle() {
			ActivePluginsList.pop()
			Logger.info(metrics.bundles)

			if (ActivePluginsList.length === 0) {
				Logger.info(SHARED_METRICS)
			}
		},
	}
}
