import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { AiOutlineScissor } from "react-icons/ai";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleReload = () => {
    window.location.reload();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShortUrlClick = async (urlId) => {
    try {
      const response = await fetch(`/api/update?urlId=${urlId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = async (urlId) => {
    const response = await fetch(`/api/redirect?urlId=${urlId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    return response;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/shorten?origUrl=${longUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (response.ok) {
        setShortUrl(data.shortUrl);
        setLongUrl("");
      } else {
        // Handle the error here
        console.error(data);
      }
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Navbar */}
        <div className={styles.description}>
          <p>
            Built by&nbsp;
            <code className={styles.code}>Eugene Goh</code>
          </p>

          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deploy with{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <h2
            className={
              "bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-lg font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-5xl md:leading-[5rem] m-5"
            }
            style={{ opacity: 1 }}
          >
            Trim Your Links with Our URL Shortener!
          </h2>

          {/* Input field */}
          <form className="flex items-center" onSubmit={handleSubmit}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>

            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <AiOutlineScissor />
              </div>

              <input
                type="url"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Trim Now"
                value={longUrl}
                onChange={(event) => setLongUrl(event.target.value)}
                pattern="^(https?:\/\/)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+$"
                title="Please enter a valid URL"
                required
              />
            </div>

            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <AiOutlineScissor />
              <span className="sr-only">Search</span>
            </button>

            <p
              type="submit"
              className="p-2.5 ml-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 text-center"
              onClick={handleReload}
            >
              Get New Data
            </p>
          </form>
        </div>

        {/* Display shorten url, target url & title tag */}
        <div className={styles.grid}>
          {data.data.map((i, index) => (
            <div
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <div className="p-5">
                <a
                  href={shortUrl}
                  onClick={() => {
                    handleRedirect(i.urlId);
                    handleShortUrlClick(i.urlId);
                  }}
                  target="_blank"
                >
                  <p className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                    {i.shortUrl}
                  </p>
                </a>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {i.title}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-ellipsis">
                  {i.origUrl}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={showModal ? handleCloseModal : handleShowModal}
                >
                  {showModal ? "Close Report" : "View Report"}
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>

                {showModal && (
                  <div className="border-t border-gray-300 pt-4 mt-5">
                    {i.clicks.map((click, index) => (
                      <div key={index} className="mb-2">
                        <div className="text-sm font-medium text-gray-700">
                          Geolocation: {click.geoLocation}
                        </div>
                        <div className="text-xs text-gray-600">
                          Timestamp:{" "}
                          {new Date(click.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/all`
      : `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/all`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
