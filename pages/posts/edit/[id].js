import { useState } from "react";
import { authorizationPage } from "../../../middlewares/authorizationPage";
import Router from "next/router";

export async function getServerSideProps(context) {
  const { token } = await authorizationPage(context);

  const { id } = context.query;

  const postReq = await fetch("http://localhost:3000/api/posts/detail/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const res = await postReq.json();

  return {
    props: {
      token,
      post: res.data,
    },
  };
}

export default function PostEdit(props) {
  const { post } = props;

  const [fields, setFields] = useState({
    title: post.title,
    content: post.content,
  });

  const [status, setStatus] = useState("normal");

  async function updateHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const { token } = props;

    const update = await fetch("/api/posts/update/" + post.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });

    if (!update.ok) return setStatus("error");

    const updateRes = await update.json();

    setStatus("success");

    Router.push("/posts");
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute("name");

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }
  return (
    <div className="max-w-6xl mx-auto p-10 md:p-20">
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={updateHandler.bind(this)}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Ubah Postingan
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Postingan ini akan ditampilkan secara publik setelah kamu
                terbitkan.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Judul Postingan{" "}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={fieldHandler.bind(this)}
                    defaultValue={post.title}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Isi Postingan{" "}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="content"
                    name="content"
                    rows="3"
                    className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                    onChange={fieldHandler.bind(this)}
                    defaultValue={post.content}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Simpan perubahan
            </button>
          </div>
        </div>
        <div>status: {status}</div>
      </form>
    </div>
  );
}
