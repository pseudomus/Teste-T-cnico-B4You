'use client';

import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useLogin from "../hooks/UseLogin";

export default function LoginPage() {
  const { loading, error, login } = useLogin();
  const form = useForm({ defaultValues: { email: "", password: "" } });

  return (
    <main className="relative min-h-screen flex bg-[#7F60FF] text-white">
      <div className="absolute inset-0 flex justify-center items-center z-0 opacity-30">
        <Image
          src="/loginImage.svg"
          alt="Background"
          width={1200}
          height={1021}
          className="object-contain"
        />
      </div>

      <div className="relative z-10 flex items-center justify-end w-1/2 p-12">
        <div className="bg-white text-black p-8 rounded-[40px] shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-6 text-[#7F60FF]">My List</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu email"
                        className="w-full border border-[#7F60FF] rounded-full focus:border-[#7F60FF] focus:ring-[#7F60FF] text-gray-900"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        className="w-full border border-[#7F60FF] rounded-full focus:border-[#7F60FF] focus:ring-[#7F60FF] text-gray-900"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-[#7F60FF] hover:bg-[#6b4de0] text-white rounded-full px-6 py-2 text-sm font-semibold"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-start w-1/2 p-16">
        <h1 className="text-4xl font-bold mb-2">Planeje hoje</h1>
        <p className="text-xl font-medium">Compre melhor amanhã</p>
      </div>
    </main>
  );
}
