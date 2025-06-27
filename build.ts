import { type BuildConfig, Glob } from "bun";
import isolatedDecl from "bun-plugin-isolated-decl";
import { convert } from "convert";

const config = (min: boolean): BuildConfig => ({
	entrypoints: ["./src/index.ts"],
	outdir: "./dist",
	format: "esm",
	naming: min ? "[dir]/[name].min.[ext]" : "[dir]/[name].[ext]",
	plugins: [isolatedDecl({})],
});

for (const m of [true, false]) {
	await Bun.build({
		...config(m),
		minify: m,
	});
}

const size = (size: number): string =>
	convert(size, "bytes").to("best").toString(3);

for await (const file of new Glob("dist/*.js").scan()) {
	const content = await Bun.file(file).arrayBuffer();
	console.log(`${file} ${size(content.byteLength)}`);

	const gzipped = Bun.gzipSync(content);
	console.log(`${file} ${size(gzipped.byteLength)} (GZIP)`);

	const deflated = Bun.deflateSync(content);
	console.log(`${file} ${size(deflated.byteLength)} (DEFLATE)`);
}
