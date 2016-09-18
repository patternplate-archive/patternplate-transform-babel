import {transform} from 'babel-core';

export default function createBabelTransform() {
	return babelTransform;
}

async function babelTransform(file, _, configuration) {
	const source = typeof file.buffer === 'string' ? file.buffer : file.buffer.toString('utf-8');
	file.buffer = await transform(source, configuration.opts).code;
	return file;
}
