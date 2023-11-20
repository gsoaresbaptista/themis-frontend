import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string(),
});

export const LoginFormObject = {
  resolver: zodResolver(LoginFormSchema),
  defaultValues: {
    email: "",
    password: "",
  },
};
