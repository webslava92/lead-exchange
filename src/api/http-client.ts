import axios, { AxiosError, AxiosResponse } from 'axios';
import { stringify } from 'qs';

export type HttpResponse<T = any> = {
  status: number;
  data?: T;
};

export type ValidationErrors = Record<string, string>;
export type AxiosBadRequestError = AxiosError<{
  validate_errors: Array<any>;
}>;

export function isAxiosError(e: any): e is AxiosError {
  return !!e && e.isAxiosError;
}

function getValidationErrors({ response }: AxiosBadRequestError) {
  const state = {};
  const mergeErrors = (
    store: ValidationErrors,
    err: any
  ): ValidationErrors => ({
    ...store,
    [err.path]: err.message,
  });

  return response!.data.validate_errors.reduce<ValidationErrors>(
    mergeErrors,
    state
  );
}

type HttpErrorConstructorParameter = {
  code: number;
  message?: string;
  validationErrors?: ValidationErrors;
  originalError?: Error;
};

export class HttpError extends Error {
  code: number;

  validationErrors?: ValidationErrors;

  originalError?: Error;

  constructor({
    message,
    code,
    validationErrors,
    originalError,
  }: HttpErrorConstructorParameter) {
    super(message);

    this.code = code;
    this.validationErrors = validationErrors;
    this.originalError = originalError;
  }
}

export async function handleResult<T = any>(
  callback: () => Promise<AxiosResponse<HttpResponse<T>>>
): Promise<T> {
  try {
    const result = await callback();
    if (result.data.status !== 200) {
      throw new Error('Request failed');
    }

    return result.data.data!;
  } catch (e) {
    const error = e;
    const responce = e.response;
    if (isAxiosError(e)) {
      if (!responce) {
        // eslint-disable-next-line no-console
        throw new Error('No Server Response');
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      } else if ([400, 409].includes(responce.status!)) {
        throw new HttpError({
          code: 400,
          validationErrors: getValidationErrors(error),
          originalError: e,
        });
      } else if (responce.status) {
        throw new HttpError({
          code: responce.status,
          originalError: e,
        });
      }
    }

    throw new HttpError({ code: 500, originalError: e });
  }
}

const baseURL = 'http://localhost:5000';

export const httpClient = axios.create({
  baseURL,
  paramsSerializer: { serialize: (params: Record<string, string>): string =>
    stringify(params, { arrayFormat: 'brackets' }),
  }
});

httpClient.interceptors.request.use((request) => {
  Object.assign(
    request.headers,
    {},
    {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
  );

  return request;
});
