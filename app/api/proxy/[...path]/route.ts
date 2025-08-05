// app/api/proxy/[...path]/route.ts

import { NextRequest, NextResponse } from "next/server";

const targetUrl = "https://development.tradefund.com/api";

// Helper function to forward requests
async function forwardRequest(req: NextRequest, path: string) {
  const url = new URL(`${targetUrl}/${path}`, req.url);

  // Create a new request object to forward
  const newRequest = new Request(url, {
    method: req.method,
    headers: req.headers,
    body:
      req.method === "POST" || req.method === "PUT" ? await req.text() : null, // Only include body for POST/PUT
  });

  // Fetch the response from the target API
  const response = await fetch(newRequest);
  const responseBody = await response.text();

  // Create a new response to return to the client
  return new Response(responseBody, {
    status: response.status,
    headers: response.headers,
  });
}

// Handle GET requests
export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params;
  return await forwardRequest(req, path.join("/"));
}

// Handle POST requests
export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params;
  return await forwardRequest(req, path.join("/"));
}

// Handle PUT requests
export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params;
  return await forwardRequest(req, path.join("/"));
}

// Handle DELETE requests
export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const { path } = params;
  return await forwardRequest(req, path.join("/"));
}
