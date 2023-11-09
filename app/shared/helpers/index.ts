import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { sDeleteUser } from 'shared/core/services/User/sDeleteUser';
import { responseError, responseSuccess } from 'shared/core/context';
import { intRegex } from 'shared/helpers/regex';

export const generateOTP = () => {
  const OTP_LENGTH = 4;

  let otp = '';

  for (let i = 0; i < OTP_LENGTH; i++) {
    const digit = Math.floor(Math.random() * 10);
    otp += digit.toString();
  }

  return otp;
};

export const utf8ToBase64 = (str: string) => {
  const encoded = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  });

  return btoa(encoded);
};

const jsonToMarkdown = (jsonObj: any, depth = 0) => {
  let markdown = '';

  if (typeof jsonObj === 'object') {
    if (Array.isArray(jsonObj)) {
      markdown += `${'  '.repeat(depth)}- `;
      jsonObj.forEach((item) => {
        markdown += jsonToMarkdown(item, depth + 1) + '\n';
      });
    } else {
      markdown += '{\n';
      for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
          markdown += `${'  '.repeat(depth + 1)}${key}: ${jsonToMarkdown(jsonObj[key], depth + 1)}\n`;
        }
      }
      markdown += `${'  '.repeat(depth)}}`;
    }
  } else {
    markdown += jsonObj;
  }

  return markdown;
};

export const getSlackMessage = (error: any) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Hey Tue 👋. There is very important notice, codetheoyeucau.com has extremely serious error.'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\`\`\` ${jsonToMarkdown(error)}\`\`\``
        }
      }
    ]
  };
};

export const getTokenPayload = (token: string, key: string) => {
  try {
    return jwt.verify(token, key);
  } catch (e) {
    throw new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHENTICATION');
  }
};

export const isInteger = (str: string) => {
  return intRegex.test(str);
};

export const validationField = (payload: any, requireFields: string[]): string[] => {
  const fields: string[] = [];

  requireFields.map((requireField) => {
    if (payload[requireField] === null || payload[requireField] === undefined) {
      fields.push(requireField);
    }
  });

  return fields;
};

export const isStringArray = (arr: any) => {
  if (!Array.isArray(arr)) {
    return false;
  }

  return arr.every((element) => typeof element === 'string');
};

export const generateRequestId = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
