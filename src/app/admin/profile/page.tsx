import {redirect} from "next/navigation";
import Link from "next/link";
import {createClient} from "@/lib/supabase/server";
import ProfileEditor from "@/components/admin/profile-editor";
export default async function AdminProfile(){
 const sb=await createClient();
 const {data:{user}}=await sb.auth.getUser();
 if(!user) redirect("/admin/login");
 const {data:admin}=await sb.from("admin_users").select("role").eq("user_id",user.id).maybeSingle();
 if(!admin) redirect("/admin/login");
 const {data}=await sb.from("profile").select("*").limit(1).maybeSingle();
 return <main className="container py-12"><Link href="/admin" className="text-sm text-[var(--muted)]">← Dashboard</Link><h1 className="display my-8 text-5xl">Profile settings</h1><ProfileEditor profile={data}/></main>;
}
