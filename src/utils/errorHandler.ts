import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: string[];
}

export interface ErrorHandlerOptions {
  showAlert?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  
  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  handleError(
    error: unknown, 
    context: string = 'Unknown',
    options: ErrorHandlerOptions = {}
  ): ApiError {
    const {
      showAlert = true,
      logError = true,
      fallbackMessage = 'An unexpected error occurred'
    } = options;

    const apiError = this.parseError(error, fallbackMessage);
    
    if (logError) {
      this.logError(error, context, apiError);
    }
    
    if (showAlert) {
      this.showUserError(apiError);
    }
    
    return apiError;
  }

  private parseError(error: unknown, fallbackMessage: string): ApiError {
    if (this.isAxiosError(error)) {
      return this.parseAxiosError(error);
    }
    
    if (error instanceof Error) {
      return {
        message: error.message || fallbackMessage,
        code: 'GENERIC_ERROR'
      };
    }
    
    return {
      message: fallbackMessage,
      code: 'UNKNOWN_ERROR'
    };
  }

  private parseAxiosError(error: AxiosError): ApiError {
    const status = error.response?.status;
    const data = error.response?.data as any;
    
    // Handle different status codes
    const statusMessages: Record<number, string> = {
      400: 'Invalid request data',
      401: 'Authentication required',
      403: 'Access forbidden',
      404: 'Resource not found',
      409: 'Resource conflict',
      422: 'Validation error',
      429: 'Too many requests',
      500: 'Internal server error',
      502: 'Service temporarily unavailable',
      503: 'Service unavailable',
      504: 'Request timeout'
    };

    let message = statusMessages[status || 0] || 'Network error occurred';
    let details: string[] | undefined;

    // Extract detailed error messages from response
    if (data) {
      if (typeof data === 'string') {
        message = data;
      } else if (data.message) {
        message = data.message;
      } else if (data.detail) {
        message = data.detail;
      } else if (data.error) {
        message = data.error;
      } else if (data.non_field_errors) {
        message = Array.isArray(data.non_field_errors) 
          ? data.non_field_errors.join(', ')
          : data.non_field_errors;
      } else if (typeof data === 'object') {
        // Handle field-specific validation errors
        const fieldErrors = Object.entries(data)
          .filter(([key]) => key !== 'message' && key !== 'detail')
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .filter(Boolean);
        
        if (fieldErrors.length > 0) {
          details = fieldErrors;
          message = 'Validation errors occurred';
        }
      }
    }

    return {
      message,
      status,
      code: `HTTP_${status}`,
      details
    };
  }

  private isAxiosError(error: unknown): error is AxiosError {
    return error !== null && 
           typeof error === 'object' && 
           'isAxiosError' in error && 
           (error as any).isAxiosError === true;
  }

  private logError(error: unknown, context: string, apiError: ApiError): void {
    // In development, log to console
    if (import.meta.env.DEV) {
      console.group(`🚨 Error in ${context}`);
      console.error('Processed Error:', apiError);
      console.error('Original Error:', error);
      console.groupEnd();
    } else {
      // In production, you could send to logging service
      console.warn(`Error in ${context}:`, apiError.message);
    }

    // Here you could integrate with external logging services
    // like Sentry, LogRocket, etc.
    // this.sendToExternalLogger(logData);
  }

  private showUserError(apiError: ApiError): void {
    let displayMessage = apiError.message;
    
    if (apiError.details && apiError.details.length > 0) {
      displayMessage += '\n\nDetails:\n' + apiError.details.join('\n');
    }
    
    // For now using alert, but this could be replaced with a toast system
    alert(displayMessage);
  }

  // Helper method to check if error is retryable
  isRetryableError(error: ApiError): boolean {
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    return retryableStatuses.includes(error.status || 0);
  }
}

// Convenience function for quick error handling
export const handleError = (
  error: unknown, 
  context: string = 'Operation',
  options?: ErrorHandlerOptions
): ApiError => {
  return ErrorHandler.getInstance().handleError(error, context, options);
};

// Async retry utility
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
  context: string = 'API Call'
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const errorHandler = ErrorHandler.getInstance();
      const apiError = errorHandler.handleError(error, context, { 
        showAlert: false, 
        logError: attempt === maxRetries 
      });

      if (attempt === maxRetries || !errorHandler.isRetryableError(apiError)) {
        throw error;
      }

      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
};