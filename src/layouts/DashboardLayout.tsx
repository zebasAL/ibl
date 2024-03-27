import Loader from '@/components/Loader';
import { useAuthContext } from '@/context/auth-context';
import { paths } from "@/routes/paths"

type DashboardLayout = {
  children: JSX.Element,
}

export default function DashboardLayout({ children }: DashboardLayout) {
  const { authenticated, loading, logout } = useAuthContext();

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">IBL TEST</span>
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm md:text-lg">
            <a href="tel:5541251234" className="text-lg text-gray-500 dark:text-white hover:underline">(+52) 662182713</a>
            <a href="tel:5541251234" className="text-lg text-gray-500 dark:text-white hover:underline">zebastianalc@gmail.com</a>
            
            {loading
             ? (
              <Loader />
             ) : (
              <button onClick={logout} className="text-blue-600 dark:text-blue-500 hover:underline">{authenticated ? "Logout" : "Login"}</button>
             )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <a href={paths.dashboard.root} className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
              </li>
              <li>
                <a href={paths.dashboard.users.root} className="text-gray-900 dark:text-white hover:underline">Users</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </>

  )
}