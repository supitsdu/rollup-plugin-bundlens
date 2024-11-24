import type { ColorCode } from "../types"

export namespace Colors {
	export const cyan: ColorCode = "\x1b[36m"
	export const green: ColorCode = "\x1b[32m"
	export const yellow: ColorCode = "\x1b[33m"
	export const red: ColorCode = "\x1b[31m"
	export const magenta: ColorCode = "\x1b[35m"
	export const blue: ColorCode = "\x1b[34m"
	export const bold: ColorCode = "\x1b[1m"
	export const dim: ColorCode = "\x1b[2m"
	export const reset: ColorCode = "\x1b[0m"
	export const resetIntensity: ColorCode = "\x1b[22m"
	export const resetColor: ColorCode = "\x1b[39m"
}
