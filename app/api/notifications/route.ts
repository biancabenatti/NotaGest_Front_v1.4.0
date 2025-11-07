import { NextResponse } from "next/server";

let notifications = [
  { id: 1, message: "📂 Arquivo enviado com sucesso!", time: "10:32" },
  { id: 2, message: "📝 Nota fiscal adicionada!", time: "10:35" },
];

export async function GET() {
  return NextResponse.json(notifications);
}


export async function POST(req: Request) {
  const body = await req.json();
  const newNotification = {
    id: Date.now(),
    message: body.message,
    time: new Date().toLocaleTimeString(),
  };
  notifications = [newNotification, ...notifications];
  return NextResponse.json(newNotification);
}
