declare module "@babel/preset-typescript" {
	type ConfigAPI = import("@babel/core").ConfigAPI;
	type TransformOptions = import("@babel/core").TransformOptions;

	const preset: (
		api: ConfigAPI,
		opts: unknown,
		dirname: string,
	) => TransformOptions;
	export default preset;
}

declare module "babel-preset-solid" {
	type ConfigAPI = import("@babel/core").ConfigAPI;
	type TransformOptions = import("@babel/core").TransformOptions;

	interface SolidOptions {
		generate?: "dom" | "ssr";
		hydratable?: boolean;
		delegateEvents?: boolean;
		builtins?: string[];
		moduleName?: string;
	}

	const preset: (
		api: ConfigAPI,
		opts: SolidOptions,
		dirname: string,
	) => TransformOptions;
	export default preset;
}
