import { NextRequest, NextResponse } from "next/server";
import { CreateValentineInput, VALIDATION } from "@/types/valentine";
import { generateSlug } from "@/lib/slug";
import { isFirebaseAdminConfigured } from "@/lib/firebase-admin";

/**
 * POST /api/valentines
 * Creates a new Valentine and returns the shareable URL
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fromName, toName, finalMessage } = body as CreateValentineInput;

    // Validation
    if (!fromName || !toName) {
      return NextResponse.json(
        { success: false, error: "Both names are required" },
        { status: 400 }
      );
    }

    if (fromName.length > VALIDATION.FROM_NAME_MAX) {
      return NextResponse.json(
        { success: false, error: `From name must be ${VALIDATION.FROM_NAME_MAX} characters or less` },
        { status: 400 }
      );
    }

    if (toName.length > VALIDATION.TO_NAME_MAX) {
      return NextResponse.json(
        { success: false, error: `To name must be ${VALIDATION.TO_NAME_MAX} characters or less` },
        { status: 400 }
      );
    }

    if (finalMessage && finalMessage.length > VALIDATION.FINAL_MESSAGE_MAX) {
      return NextResponse.json(
        { success: false, error: `Message must be ${VALIDATION.FINAL_MESSAGE_MAX} characters or less` },
        { status: 400 }
      );
    }

    let slug: string;

    if (isFirebaseAdminConfigured()) {
      // Use Firestore
      const { createValentine } = await import("@/lib/firestore");
      const valentine = await createValentine({
        fromName: fromName.trim(),
        toName: toName.trim(),
        finalMessage: finalMessage?.trim() || undefined,
      });
      slug = valentine.slug;
    } else {
      slug = generateSlug();
    }

    // Build the shareable URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    request.headers.get("origin") || 
                    "http://localhost:3000";
    const url = `${baseUrl}/love/${slug}`;

    return NextResponse.json({
      success: true,
      slug,
      url,
    });
  } catch (error) {
    console.error("Error creating valentine:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create valentine. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/valentines?slug=XXXXXX
 * Fetches a Valentine by slug (used for development mode)
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { success: false, error: "Slug is required" },
      { status: 400 }
    );
  }

  if (isFirebaseAdminConfigured()) {
    // Use Firestore
    const { getValentineBySlug } = await import("@/lib/firestore");
    const valentine = await getValentineBySlug(slug);
    
    if (!valentine) {
      return NextResponse.json(
        { success: false, error: "Valentine not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, valentine });
  } else {
    // Use in-memory store for development
  }
}
