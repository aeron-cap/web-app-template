import { ArgumentsHost, Catch, ConflictException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

interface PostgresError {
  code: string;
  detail?: string;
  constraint?: string;
}

interface DrizzleError extends Error {
  cause?: PostgresError;
}

function isDrizzleUniqueViolation(error: unknown): error is DrizzleError {
  const err = error as Record<string, any>;

  return (
    typeof err === 'object' &&
    err !== null &&
    'cause' in err &&
    typeof err.cause === 'object' &&
    err.cause !== null &&
    (err.cause as { code: string }).code === '23505'
  );
}

@Catch()
export class GlobalDbExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (isDrizzleUniqueViolation(exception)) {
      const detail = exception.cause?.detail;
      let message = 'A record with that unique value already exists';
      if (typeof detail === 'string') {
        const match = detail.match(/Key \((.*?)\)=\(.*\) already exists/);
        if (match && match[1]) {
          const column = match[1];
          message = `${column.charAt(0).toUpperCase() + column.slice(1)} already exists`;
        }
      }
      const conflictException = new ConflictException(message);
      return super.catch(conflictException, host);
    }
    super.catch(exception, host);
  }
}
