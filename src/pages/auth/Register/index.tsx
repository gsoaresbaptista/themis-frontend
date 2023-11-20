import { useAuth } from "../../../context/AuthProvider/useAuth";
import { useNavigate, Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(8, {
    message: "O nome deve possuir pelo menos 8 caracteres.",
  }),
  email: z.string(),
  password: z.string(),
  passwordCheck: z.string(),
});

export const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  const auth = useAuth();
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const response = await auth.authenticate(email, password);
    // if (response) {
    //   navigate('/profile');
    // } else {
    //   console.log('E-mail ou senha inválidos!');
    // }
  }

  return (
    <div>
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input className="shad-input" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input className="shad-input" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input className="shad-input" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordCheck"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Confirme sua senha</FormLabel>
                  <FormControl>
                    <Input className="shad-input" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-foreground">
              Cadastrar
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex gap-2">
        Já possui uma conta?
        <Link to="/login" className="dark:text-primary text-violet-600">
          Entre agora!
        </Link>
      </div>
    </div>
  );
};
