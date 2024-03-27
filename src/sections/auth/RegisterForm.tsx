import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@/context/auth-context';
import HelperText from "@/components/HelperText"

const validationSchema = yup
.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  remember: yup.boolean().default(false)
})
type ValidationSchema = yup.InferType<typeof validationSchema>;


// --------------------------------------------------------------


export default function SignInForm() {
  const { login } = useAuthContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
    },
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
    await login(data.email, data.password)
  }

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input {...register("email")} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="zebastianalc@gmail.com" />
        {errors.email && (<HelperText type="danger">{errors.email.message ?? ""}</HelperText>)}
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input {...register("password")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {errors.password && (<HelperText type="danger">{errors.password.message ?? ""}</HelperText>)}
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input {...register("remember")} id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
      </div>
      <button disabled={isSubmitting} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400">
        Submit
      </button>
    </form>
  )
}