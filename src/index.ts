import { type TransformOptions, transformAsync } from "@babel/core";
import ts from "@babel/preset-typescript";
import solid from "babel-preset-solid";
import type { BunPlugin, PluginBuilder } from "bun";
import "bun-only";

export interface SolidPluginOptions {
	generate?: "dom" | "ssr";
	hydratable?: boolean;
	babelOptions?: TransformOptions;
}

const cache = new Map<string, { hash: number | bigint; code: string }>();

function SolidPlugin(options: SolidPluginOptions = {}): BunPlugin {
	const { babelOptions = {}, ...solidOptions } = options;

	const baseBabelConfig: TransformOptions = {
		babelrc: false,
		configFile: false,
		...babelOptions,
		presets: [
			...(babelOptions.presets ?? []),
			[solid, solidOptions],
			[ts, { isTSX: true, allExtensions: true }],
		],
		plugins: [
			...(babelOptions.plugins ?? []),
		],
	};

	return {
		name: "bun-plugin-solid",
		setup: (build: PluginBuilder) => {
			build.onLoad({ filter: /\.[jt]sx$/ }, async (args) => {
				const code = await Bun.file(args.path).text();

				const currentHash = Bun.hash(code);
				const cached = cache.get(args.path);

				if (cached && cached.hash === currentHash) {
					return {
						contents: cached.code,
						loader: "js",
					};
				}

				const transforms = await transformAsync(code, {
					...baseBabelConfig,
					filename: args.path,
				});

				if (!transforms?.code) {
					throw new Error(
						`Solid transformation failed for ${args.path}`,
					);
				}

				cache.set(args.path, {
					hash: currentHash,
					code: transforms.code,
				});

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
