import { promisify } from "node:util"
import { gzip as GzipLib } from "node:zlib"

export const sizeLens = async (inputString: string) => {
	const compressed = await promisify(GzipLib)(inputString)

	const size = inputString.length
	const gzip = compressed.length

	return { size, gzip, getSizes: () => ({ size, gzip }) }
}
