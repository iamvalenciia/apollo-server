import { merge } from 'lodash';
import { Mutations } from './mutations';
import { Querys } from './querys';

export const postResolver = merge(Querys, Mutations);
