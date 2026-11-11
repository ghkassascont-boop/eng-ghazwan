import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
const schema=z.object({name:z.string().min(2).max(100),email:z.email().max(254),message:z.string().min(10).max(5000)});
export async function POST(request:Request){
 try{
  const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:"Invalid input"},{status:400});
  const supabase=await createClient();const {error}=await supabase.from("messages").insert(parsed.data);
  if(error)throw error;return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:"Unable to send message"},{status:500});}
}