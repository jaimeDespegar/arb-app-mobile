
import * as React from 'react';
import { getValue } from './StorageHelper';

import en_lang from './../../../assets/files/en-lang.json';
import es_lang from './../../../assets/files/es-lang.json';
import pt_lang from './../../../assets/files/pt-lang.json';

const labelsByLanguages = {
	'es': es_lang,
	'en': en_lang,
	'pt': pt_lang,
};

export const getLabel = async () => {
	const language = await getValue('language');
	console.log('language stored ', language);
	return labelsByLanguages[language || 'es'];
}

export async function findLabels() {
	const data = await getLabel();
	return data || {};
}