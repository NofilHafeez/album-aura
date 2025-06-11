import { SchemaTypeDefinition } from 'sanity';
import user from './user';
import collection from './collection';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, collection],
};
