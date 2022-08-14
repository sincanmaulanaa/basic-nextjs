import { authorizationPage } from "../../middlewares/authorizationPage";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";

export async function getServerSideProps(context) {
  const { token } = await authorizationPage(context);

  const postReq = await fetch("http:localhost:3000/api/posts/read", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const posts = await postReq.json();

  return {
    props: {
      token,
      posts: posts.data,
    },
  };
}

export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);

  async function deleteHandler(id, e) {
    e.preventDefault();

    const { token } = props;

    const warn = confirm("Apakah data ini akan kamu hapus?");

    if (warn) {
      const deletePost = await fetch("/api/posts/delete/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const res = await deletePost.json();

      const postsFiltered = posts.filter((post) => {
        return post.id != id && post;
      });

      setPosts(postsFiltered);
    }
  }

  function editHandler(id) {
    Router.push("/posts/edit/" + id);
  }

  function splitedContent(content) {
    const split = content || "";
    const splitedContent = split.split(" ", 4);

    return splitedContent;
  }
  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Postingan terbaru
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Berita artikel serta tips dan trik seputar dunia design dan
            development.
          </p>
        </div>
        <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {posts.map((post) => (
            <div key={post.id}>
              <div>
                <a href="#" className="inline-block">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    {" "}
                    {post.true}{" "}
                  </span>
                </a>
              </div>
              <a href="#" className="block mt-4">
                <p className="text-xl font-semibold text-gray-900">
                  {post.title}
                </p>
                <p className="mt-3 text-base text-gray-500">
                  {splitedContent(post.content).join(" ")}...
                </p>
              </a>
              <div className="flex space-x-3 mt-3">
                <button onClick={editHandler.bind(this, post.id)}>
                  <PencilAltIcon className="h-5 w-5 cursor-pointer text-blue-600 hover:text-blue-800 transition duration-200" />
                </button>
                <button onClick={deleteHandler.bind(this, post.id)}>
                  <TrashIcon className="h-5 w-5 cursor-pointer text-red-600 hover:text-red-800 transition duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
