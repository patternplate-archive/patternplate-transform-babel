import {transform} from 'babel-core';

export default function createBabelTransform() {
	return babelTransform;
}

function babelTransform(file, _, configuration) {
	const source = typeof file.buffer === 'string' ? file.buffer : file.buffer.toString('utf-8');
	file.buffer = transform(source, configuration.opts).code;

	if (configuration.recursive) {
		walk(file.dependencies, dependency => {
			const dependencySource = typeof dependency.buffer === 'string' ? dependency.buffer : dependency.buffer.toString('utf-8');
			dependency.buffer = transform(dependencySource, configuration.opts).code;
		});
	}

	return Promise.resolve(file);
}

function walk(dependencyTree, predecate) {
	flatten(dependencyTree).forEach(predecate);
}

function flatten(dependencyTree, vault = []) {
	return Object.values(dependencyTree || {})
		.reduce((list, item) => {
			list.push(item);
			flatten(item.dependency, list);
			return list;
		}, vault);
}
