import * as yup from "yup";

export const yupSchemas = (type) => {
    switch (type)
    {
      case ("signin"):
      {
        return yup.object({
          user: yup.string().required("Nome de usuário é obrigatório"),
          password: yup.string().required("Senha é obrigatória")
        }).required();
      }
      default: break
    }
}