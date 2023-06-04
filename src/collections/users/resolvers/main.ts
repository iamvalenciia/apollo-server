import { Querys } from './querys';
import { Mutations } from './mutations';
import { merge } from 'lodash';

export const userResolver = merge(Querys, Mutations);
