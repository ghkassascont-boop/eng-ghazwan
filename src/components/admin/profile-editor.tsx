"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";
export default function ProfileEditor({profile}:{profile:any}){
 const router=useRouter(); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [ok,setOk]=useState("");
 const [form,setForm]=useState({
  full_name:profile?.full_name||"",title_en:profile?.title_en||"",title_ar:profile?.title_ar||"",
  bio_en:profile?.bio_en||"",bio_ar:profile?.bio_ar||"",email:profile?.email||"",
  phone:profile?.phone||"",whatsapp:profile?.whatsapp||"",instagram:profile?.instagram||"",linkedin:profile?.linkedin||""
 });
 const update=(k:string,v:string)=>setForm(old=>({...old,[k]:v}));
 async function save(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");setOk("");try{
  const sb=createClient();let result;
  if(profile?.id) result=await sb.from("profile").update({...form,updated_at:new Date().toISOString()}).eq("id",profile.id);
  else result=await sb.from("profile").insert(form);
  if(result.error)throw result.error;setOk("Profile updated successfully.");router.refresh();
 }catch(e){setError(e instanceof Error?e.message:"Could not save profile.");}finally{setBusy(false);}}
 const input=(key:string,label:string,rtl=false)=><label className="block text-xs">{label}<input className="field mt-2" dir={rtl?"rtl":"ltr"} value={(form as any)[key]} onChange={e=>update(key,e.target.value)}/></label>;
 return <form onSubmit={save} className="card grid gap-5 p-7 md:grid-cols-2">
  {input("full_name","Full name")}{input("email","Public email")}
  {input("title_en","Professional title (English)")}{input("title_ar","المسمى المهني",true)}
  <label className="block text-xs md:col-span-2">Biography (English)<textarea className="field mt-2 min-h-28" value={form.bio_en} onChange={e=>update("bio_en",e.target.value)}/></label>
  <label className="block text-xs md:col-span-2">النبذة بالعربية<textarea dir="rtl" className="field mt-2 min-h-28" value={form.bio_ar} onChange={e=>update("bio_ar",e.target.value)}/></label>
  {input("phone","Phone")}{input("whatsapp","WhatsApp number (international format)")}
  {input("instagram","Instagram URL")}{input("linkedin","LinkedIn URL")}
  <div className="md:col-span-2"><button disabled={busy} className="btn">{busy?"Saving...":"Save profile"}</button></div>
  <p className="text-sm text-green-800 md:col-span-2">{ok}</p><p className="text-sm text-red-700 md:col-span-2">{error}</p>
 </form>;
}
