import { userResolver } from '../collections/users/resolvers/main';
import { postResolver } from '../collections/posts/resolvers/main';
import { merge } from 'lodash';

export default merge(userResolver, postResolver);
