import Image from "next/dist/client/image";
import Link from "next/link";
import workflowLogo from "../../public/images/workflow.svg";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Cookie from "js-cookie";
import Banner from "../../components/Banner";

export default function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  async function loginHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!loginReq.ok) return setStatus("error " + loginReq.status);

    const loginRes = await loginReq.json();

    setStatus("success");

    Cookie.set("token", loginRes.token);
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
      {status === "error 401" && (
        <Banner value={`Yahhh! Email atau password salah.`} />
      )}
      {status === "success" && (
        <Banner
          value={`Yeayy! Email atau password benar, Kamu sedang diarahkan ke halaman dashboard`}
        />
      )}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col">
            <Image src={workflowLogo} alt="Workflow" width={48} height={48} />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Masuk ke akunmu!
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={loginHandler.bind(this)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={fieldHandler.bind(this)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Alamat Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={fieldHandler.bind(this)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
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
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                </span>
                Masuk
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Belum punya akun? ayo
            <Link href="/auth/register">
              <a className="font-medium text-blue-600 hover:text-blue-500">
                {" "}
                daftar{" "}
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
