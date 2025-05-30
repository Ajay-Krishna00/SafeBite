import { supabase } from "./supabase";

export const signUp = async (username:string,email:string,password:string) => {
    const {data,error} = await supabase.auth.signUp({email,password})
    return {data,error}
}
export const signin = async (email:string,password:string) => {
    const {data,error} = await supabase.auth.signInWithPassword({email,password})
    return {data,error}
}