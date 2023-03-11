import { useState } from "react";

function Card({ shortUrl, titleTag, targetUrl }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <a href={shortUrl} target="_blank">
            <p className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
              {shortUrl}
            </p>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {titleTag}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {targetUrl}
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleShowModal}
          >
            View Report
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
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                <div className="relative bg-white w-1/2 max-w-md mx-auto rounded-lg shadow-lg z-10">
                  <div className="p-4">
                    <div className="p-6 space-y-6">
                      <h1>Report on This Shorten URL</h1>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Number of Clicks
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Originating Geolocation
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Timestamp
                      </p>
                    </div>

                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        data-modal-hide="defaultModal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
