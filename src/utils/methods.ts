import { randomBytes } from 'node:crypto';

export const generateUniqueId = () => {
	return randomBytes(16).toString('hex');
};
