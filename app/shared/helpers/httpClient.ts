import _isUndefined from 'lodash/isUndefined';
import _get from 'lodash/get';
import axios, { AxiosError, AxiosResponse } from 'axios';
import sharedServices from '../config/services';
import { Services } from 'shared/types/service';
import queryString from 'node:querystring';

type ServiceInfo = {
  method: string;
  url: string;
};
let services: Services = [];

const injectServices = (
  s: Array<{
    base_url: string;
    name: string;
    services: {
      [key: string]: string;
    };
  }>
) => {
  services = [...services, ...s];
};

injectServices(sharedServices);
const getServiceInfo = (args: { params?: object; query?: object; serviceName: keyof (typeof services)[number]['services']; body?: string }): ServiceInfo => {
  for (const service of services) {
    if (service.services.hasOwnProperty(args.serviceName)) {
      const [method, uri] = service.services[args.serviceName].split(' ');
      let url: string = `${service.base_url}${uri}`;

      if (!_isUndefined(args.query)) {
        url = `${url}?${queryString.stringify(args.query as any)}`;
      }

      if (!_isUndefined(args.params)) {
        Object.keys(args.params).map((key) => {
          url = url.replace(`:${key}`, _get(args.params as object, key));
        });
      }

      return {
        method: method.toUpperCase(),
        url
      };
    }
  }

  throw new Error('Service not found ' + args.serviceName);
};

const doHttp = (args: {
  params?: object;
  query?: object;
  body?: string | any;
  serviceName: keyof (typeof services)[number]['services'];
  headers?: {
    [key: string]: string;
  };
}) => {
  const serviceInfo = getServiceInfo(args);
  return new Promise((resolve, reject) => {
    axios
      .request({
        method: serviceInfo.method,
        url: serviceInfo.url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: args.body
      })
      .then((response: AxiosResponse<any>) => {
        resolve(response.data);
      })
      .catch((err: AxiosError | any) => {
        if (err.name === 'AbortError') {
          return;
        }
        if ((err as AxiosError).response?.data) {
          reject(new Error(JSON.stringify((err as AxiosError).response?.data)));
        } else {
          reject(err);
        }
      });
  });
};

export { doHttp };
