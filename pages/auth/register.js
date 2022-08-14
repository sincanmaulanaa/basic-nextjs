import Image from "next/image";
import { useState } from "react";
import workflowLogo from "../../public/images/workflow.svg";
import Banner from "../../components/Banner";
import Link from "next/link";
import { unauthorizationPage } from "../../middlewares/authorizationPage";

export async function getServerSideProps(context) {
  await unauthorizationPage(context);
  return { props: {} };
}

export default function Register() {
  const [fields, setFields] = useState({ email: "", password: "" });

  const [status, setStatus] = useState("normal");

  async function registerHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!registerReq.ok) return setStatus("error " + registerReq.status);

    const registerRes = await registerReq.json();

    setStatus("success");
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute("name");

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }
  return (
    <>
      {" "}
      {status === "success" && (
        <Banner value={`Yeayy! Kamu berhasil mendaftar, silahkan login ya.`} />
      )}
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans mt-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col">
          <Image
            src={workflowLogo}
            alt="Workflow logo"
            width={48}
            height={48}
            priority
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Buat akunmu!
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={registerHandler.bind(this)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={fieldHandler.bind(this)}
                    placeholder="Alamat Email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={fieldHandler.bind(this)}
                    placeholder="Masukkan password baru"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {" "}
                    Ingat saya{" "}
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    {" "}
                    Lupa password kamu?{" "}
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Daftar
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center mt-1">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm items-center">
                  <span className="px-2 bg-white text-gray-500">
                    {" "}
                    Sudah punya akun?{" "}
                    <Link href="/auth/login">
                      <a className="font-medium text-blue-600 hover:text-blue-500">
                        {" "}
                        Masuk sekarang{" "}
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
