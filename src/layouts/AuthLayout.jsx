import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div>
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-1/2">
          <Outlet/>

        </div>

      </main>
    </div>
  )
}

export default AuthLayout
