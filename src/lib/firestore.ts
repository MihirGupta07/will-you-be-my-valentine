import { adminDb } from "./firebase-admin";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { Valentine, CreateValentineInput } from "@/types/valentine";
import { generateSlug } from "./slug";

const COLLECTION_NAME = "valentines";
const MAX_RETRIES = 5;

/**
 * Creates a new Valentine document in Firestore (server-side)
 * Uses Firebase Admin SDK
 */
export async function createValentine(
  input: CreateValentineInput
): Promise<Valentine> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const slug = generateSlug();
    const docRef = adminDb.collection(COLLECTION_NAME).doc(slug);

    try {
      // Check if slug already exists
      const existingDoc = await docRef.get();

      if (existingDoc.exists) {
        retries++;
        continue;
      }

      // Create the valentine
      const valentine: Valentine = {
        slug,
        fromName: input.fromName.trim(),
        toName: input.toName.trim(),
        finalMessage: input.finalMessage?.trim() || undefined,
        createdAt: Timestamp.now(),
      };

      await docRef.set(valentine);
      return valentine;
    } catch (error) {
      retries++;
      if (retries >= MAX_RETRIES) {
        throw new Error("Failed to create valentine after multiple attempts");
      }
    }
  }

  throw new Error("Failed to generate unique slug");
}

/**
 * Fetches a Valentine by slug (client-side)
 * Uses regular Firebase SDK
 */
export async function getValentineBySlug(
  slug: string
): Promise<Valentine | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, slug);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data() as Valentine;
  } catch (error) {
    console.error("Error fetching valentine:", error);
    return null;
  }
}
