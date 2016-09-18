import applyTransform from './apply-transform';
import walk from './walk';

export default createBabelTransform;

function createBabelTransform() {
	return babelTransform;
}

function babelTransform(file, _, configuration) {
	const apply = file => {
		return applyTransform(file, configuration.opts);
	};

	file.buffer = apply(file).buffer;

	walk(file.dependencies, dependency => {
		dependency.buffer = apply(dependency).buffer;
	});

	return Promise.resolve(file);
}
