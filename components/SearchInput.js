import React from "react";
import { AiOutlineScissor } from "react-icons/ai";

function SearchInput() {
  return (
    <form class="flex items-center">
      <label for="simple-search" class="sr-only">
        Search
      </label>

      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineScissor />
        </div>

        <input
          type="text"
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Trim Now"
          required
        />
      </div>

      <button
        type="submit"
        class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <AiOutlineScissor />
        <span class="sr-only">Search</span>
      </button>
    </form>
  );
}

export default SearchInput;
