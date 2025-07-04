import { NextRequest, NextResponse } from 'next/server';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzE5lyJD650cgBJWksZ3ASkjpLK8MYkt2nK30BTmzcqYwbQo98LQwhozwj-55Zaf8-n/exec";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ status: "error", message: "Missing email" }, { status: 400 });
    }

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    let result:unknown;
    const text = await response.text();
    try {
      result = JSON.parse(text);
    } catch {
      result = { status: "success", message: text };
    }

    return NextResponse.json(result, { status: response.status });
  } catch (err: unknown) {
  let message = "Something went wrong";
  if (err instanceof Error) {
    message = err.message;
  }

  return NextResponse.json({ status: "error", message }, { status: 500 });
}

}
