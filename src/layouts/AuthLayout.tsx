type AuthLayout = {
  children: JSX.Element,
  image: string,
  title: string,
}

export default function AuthClassicLayout({ children, image, title }: AuthLayout) {
  return (
    <div className="flex min-h-screen w-full max-w-[1000px] mx-auto">
      <div className="flex-grow w-[65%] items-center justify-center bg-gradient-to-br from-opacity-88 to-opacity-94 hidden sm:flex">
        <div className="max-w-480 text-center">
          <h3 className="text-3xl">{title}</h3>
          <img className="max-w-720 mx-auto" src={image || '/assets/images/fullLogo.png'} alt="auth" />
        </div>
      </div>

      <div className="flex justify-center items-center w-full sm:w-[35%]">
        <div className="w-full max-w-480 px-2 md:px-8 py-15 md:py-30">
          <h3 className="text-3xl block text-center mb-4 sm:hidden">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
}
