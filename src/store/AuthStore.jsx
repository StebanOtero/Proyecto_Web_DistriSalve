import { useState } from "react";
import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useAuthStore = create((set, get) => ({
  isAuth:false,
  datauserAuth: [],
  signInWithEmail: async (p) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.correo,
      password: p.pass,
    })
    if (error){
      console.error("Error de autenticación:", error.message);
      return null;
    }
    return data.user;
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    set({ isAuth: false });
    if (error)
      throw new Error("A ocurrido un error durante el cierre de sesión"+error);
  },

}));
