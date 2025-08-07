// app/api/submit/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { getCollections } from "@/lib/collections";
import { pariticipants, setSubmitted } from "@/lib/participants";

// To disable body parsing by default (not required for App Router + formData)
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  // Get session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Read multipart form data
    const formData = await request.formData();

    const file = formData.get("image") as File;
    const url = formData.get("liveUrl")?.toString() || "";
    const githubUrl = formData.get("githubUrl")?.toString() || "";

    if (!file || !url || !githubUrl) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Make sure images folder exists
    const uploadDir = path.join(process.cwd(), "/tmp", "images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save file
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/\s+/g, "_");
    const fileName = `${session.user.email}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/tmp/images/${fileName}`;

    // Store in DB
    const { submissions } = await getCollections();
    await submissions.insertOne({
      creatorName: session.user.name,
      imageUrl,
      url,
      githubUrl,
      voteCount: 0,
      createdAt: new Date(),
      });

      setSubmitted(session.user?.email);
    return NextResponse.json({
      success: true,
      imageUrl,
      url,
      githubUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

