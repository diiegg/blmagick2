"use client";

import DOMPurify from "dompurify";
import { nanoid } from "nanoid";

/**
 * Form Security Utilities
 * Implements CSRF protection, rate limiting, and input sanitization
 */

// CSRF Token Management
const CSRF_TOKEN_KEY = "csrf_token";
const CSRF_TOKEN_EXPIRY = 3600000; // 1 hour

export class CSRFProtection {
  static generateToken(): string {
    const token = nanoid(32);
    const expiry = Date.now() + CSRF_TOKEN_EXPIRY;
    
    if (typeof window !== "undefined") {
      sessionStorage.setItem(CSRF_TOKEN_KEY, token);
      sessionStorage.setItem(`${CSRF_TOKEN_KEY}_expiry`, expiry.toString());
    }
    
    return token;
  }

  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    
    const token = sessionStorage.getItem(CSRF_TOKEN_KEY);
    const expiry = sessionStorage.getItem(`${CSRF_TOKEN_KEY}_expiry`);
    
    if (!token || !expiry) return null;
    
    // Check if token is expired
    if (Date.now() > parseInt(expiry)) {
      this.clearToken();
      return null;
    }
    
    return token;
  }

  static validateToken(token: string): boolean {
    const storedToken = this.getToken();
    return storedToken === token;
  }

  static clearToken(): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(CSRF_TOKEN_KEY);
    sessionStorage.removeItem(`${CSRF_TOKEN_KEY}_expiry`);
  }
}

// Rate Limiting (Client-side)
interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  constructor(private config: RateLimitConfig) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove expired attempts
    const validAttempts = attempts.filter(
      (timestamp) => now - timestamp < this.config.windowMs
    );
    
    if (validAttempts.length >= this.config.maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    return true;
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const timeElapsed = Date.now() - oldestAttempt;
    const remaining = this.config.windowMs - timeElapsed;
    
    return Math.max(0, remaining);
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Input Sanitization
export class InputSanitizer {
  /**
   * Sanitize HTML to prevent XSS attacks
   */
  static sanitizeHTML(dirty: string): string {
    if (typeof window === "undefined") return dirty;
    
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [], // Strip all HTML tags
      ALLOWED_ATTR: [],
    });
  }

  /**
   * Sanitize email input
   */
  static sanitizeEmail(email: string): string {
    return email.trim().toLowerCase().replace(/[^\w.@+-]/g, "");
  }

  /**
   * Sanitize text input (remove control characters, limit length)
   */
  static sanitizeText(text: string, maxLength: number = 1000): string {
    return text
      .trim()
      .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
      .substring(0, maxLength);
  }

  /**
   * Validate and sanitize phone number
   */
  static sanitizePhone(phone: string): string {
    return phone.replace(/[^\d+() -]/g, "");
  }

  /**
   * SQL injection prevention (basic check for client-side validation)
   */
  static hasSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /(--)|(\/\*)|(\*\/)/g,
      /(;)|(')|(\")/g,
    ];
    
    return sqlPatterns.some((pattern) => pattern.test(input));
  }
}

// Honeypot Field (invisible field to catch bots)
export function useHoneypot() {
  const honeypotFieldName = `field_${nanoid(10)}`;
  
  return {
    fieldName: honeypotFieldName,
    validate: (value: string) => value === "", // Should be empty if not a bot
  };
}

// Form submission with security
export interface SecureFormSubmission<T> {
  data: T;
  csrfToken: string;
  timestamp: number;
  fingerprint?: string;
}

export async function submitSecureForm<T>(
  endpoint: string,
  data: T,
  options?: RequestInit
): Promise<Response> {
  const csrfToken = CSRFProtection.getToken() || CSRFProtection.generateToken();
  
  const payload: SecureFormSubmission<T> = {
    data,
    csrfToken,
    timestamp: Date.now(),
  };
  
  return fetch(endpoint, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
      ...options?.headers,
    },
    body: JSON.stringify(payload),
  });
}
