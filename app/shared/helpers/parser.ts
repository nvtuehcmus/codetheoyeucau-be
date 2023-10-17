import { ObjectId } from 'mongodb';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';

export const toObjectId = (id: string) => {
  try {
    return new ObjectId(id);
  } catch (e) {
    throw new LogError(ErrorVars.E011_ID_NOT_CORRECTLY, 'LOGIC');
  }
};

export const arrayParser = (stringArray: string) => {
  try {
    return JSON.parse(stringArray);
  } catch (e) {
    throw new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC');
  }
};
