import {uniqBy} from 'lodash/fp';
import flatten from './flatten';

const uniqByPath = uniqBy('path');

export default walk;

function walk(dependencyTree, predecate) {
	uniqByPath(flatten(dependencyTree)).forEach(predecate);
}
