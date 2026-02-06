import { Timestamp } from "firebase-admin/firestore";

/**
 * Valentine document stored in Firestore
 */
export interface Valentine {
  /** Unique 6-character slug (also the document ID) */
  slug: string;

  /** Name of the person sending the valentine (max 30 chars) */
  fromName: string;

  /** Name of the recipient (max 30 chars) */
  toName: string;

  /** Optional final message displayed on celebration screen (max 280 chars) */
  finalMessage?: string;

  /** Timestamp when the valentine was created */
  createdAt: Timestamp;
}

/**
 * Input for creating a new Valentine
 */
export interface CreateValentineInput {
  fromName: string;
  toName: string;
  finalMessage?: string;
}

/**
 * API response for successful valentine creation
 */
export interface CreateValentineResponse {
  success: true;
  slug: string;
  url: string;
}

/**
 * API response for errors
 */
export interface ErrorResponse {
  success: false;
  error: string;
}

/**
 * Validation constants
 */
export const VALIDATION = {
  FROM_NAME_MAX: 30,
  TO_NAME_MAX: 30,
  FINAL_MESSAGE_MAX: 280,
} as const;
