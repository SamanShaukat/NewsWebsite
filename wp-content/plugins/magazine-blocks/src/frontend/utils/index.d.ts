import * as utils from "./index";
export {};

type P<T> = {
	[K in keyof T]: T[K];
} & {};

declare global {
	interface Window {
		magazineBlocksUtils: P<typeof utils>;
	}
}
