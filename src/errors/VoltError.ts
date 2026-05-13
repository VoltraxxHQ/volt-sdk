/**
 * Custom Error class for the Volt SDK
 * 
 * Provides a standardized way to handle errors specific to the Volt protocol,
 * including optional error codes for programmatic handling.
 */
export class VoltError extends Error {
  /**
   * Optional error code for identifying specific error types
   */
  public code?: string;

  /**
   * Create a new VoltError
   * @param message Human-readable error message
   * @param code Optional machine-readable error code
   */
  constructor(message: string, code?: string) {
    // Call base Error constructor
    super(message);
    
    // Set the error name for stack traces
    this.name = 'VoltError';
    
    // Assign custom error code if provided
    this.code = code;
    
    // Restore prototype chain for proper 'instanceof' checks in older JS environments
    Object.setPrototypeOf(this, VoltError.prototype);
  }
}
