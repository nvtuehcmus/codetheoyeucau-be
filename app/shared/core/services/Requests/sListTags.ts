import { rGetTags } from 'shared/core/repo/Requests/rGetTags';

export const sListTags = async () => {
  return await rGetTags();
};
