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
          text: 'Hey Tue 👋. There is very important notice, codetheoyeucau.com has extremely serious error.',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\`\`\` ${jsonToMarkdown(error)}\`\`\``,
        },
      },
    ],
  };
};
