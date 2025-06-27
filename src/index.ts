import { type TransformOptions, transformAsync } from "@babel/core";
// @ts-ignore
import ts from "@babel/preset-typescript";
// @ts-ignore
import solid from "babel-preset-solid";
import type { BunPlugin } from "bun";
import { merge } from "es-toolkit";

export interface SolidPluginOptions {
	generate?: "dom" | "ssr";
	hydratable?: boolean;
	babelOptions?: TransformOptions;
}

function SolidPlugin(options: SolidPluginOptions = {}): BunPlugin {
	return {
		name: "bun-plugin-solid",
		setup: (build) => {
			build.onLoad({ filter: /\.(js|ts)x$/ }, async (args) => {
				const code = await Bun.file(args.path).text();
				const transforms = await transformAsync(
					code,
					merge(
						{
							filename: args.path,
							presets: [
								[solid, options],
								[ts, {}],
							],
						},
						options.babelOptions ?? {},
					),
				);

				if (!transforms?.code) {
					throw new Error("Code not generated");
				}

				return {
					contents: transforms.code,
					loader: "js",
				};
			});
		},
	};
}

export default SolidPlugin;
export { SolidPlugin };
