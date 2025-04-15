import { NextRequest, NextResponse } from "next/server";
import createGitHubUploader from "@/lib/utils/githubImageUpload";

const githubConfig = {
  owner: process.env.NEXT_PUBLIC_GITHUB_OWNER || "",
  repo: process.env.NEXT_PUBLIC_GITHUB_REPO || "",
  token: process.env.NEXT_PUBLIC_GITHUB_TOKEN || "",
};

// Initialize the uploader once
const uploader = createGitHubUploader(githubConfig);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file provided",
        },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          error: "File must be an image",
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "File size must be less than 5MB",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;

    // Use the new uploader with object parameter
    const imageUrl = await uploader.uploadImage({
      imageBuffer: buffer,
      filename,
    });

    return NextResponse.json({
      success: true,
      url: imageUrl,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}
