"use client"; // Add this at the top

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import NewsPreviewCard from "../components/NewsPreviewCard";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [dependency, setDependency] = useState(0);
  const [hasError, setHasError] = useState(false);

  const fetchArticles = useMemo(() => async () => {
    setLoading(true);
    try {
      let response = null;
      if (!query.trim()){
        response = await fetch(`/api/news-headlines`);
      } else {
        response = await fetch(`/api/news-search/${encodeURIComponent(query)}`
        );
      }
      if (response == null || !response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseDate = await response.json();
      const articles = responseDate.data.articles || [];
      const completeArticles = articles.filter(article => article.urlToImage != null);
      setNews(completeArticles);
      setLoading(false);
      return completeArticles;
    } catch (error) {
      setHasError(true);
      console.error("Error fetching news:", error);
      setLoading(false);
    } 
  }, [dependency]);

  // Fetch the product list on component mount
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    setDependency(dependency + 1)
  }

  return (
    
    <div>
      {hasError &&
      <div id="alert-additional-content-2" className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <div className="flex items-center">
          <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">Error</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
        An error occurred while retrieving the news. Please try again later.
        </div>
      </div> }
      
      <div id="newsletter-banner" className=" top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center flex-shrink-0 w-full mx-auto sm:w-auto">
            <form onSubmit={handleSearch} className="flex flex-col items-center w-full md:flex-row">
                <label className="flex-shrink-0 mb-2 me-auto text-sm font-medium text-gray-500 md:mb-0 md:me-4 dark:text-gray-400 md:m-0">Search Latest News</label>
                <input disabled={loading} value={query} onChange={(e) => setQuery(e.target.value)} type="text" id="text" placeholder="Search Title" className="bg-white border border-gray-300 text-gray-900 md:w-64 mb-2 md:mb-0 md:me-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button 
                  type="submit" 
                  className="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {!loading ?
                    <>Search</>
                    :
                    <div className="text-center">
                        <div role="status">
                        <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    }
                </button>
            </form>
        </div>
      </div>
      
      {loading ?
        <div className="bg-white p-4 rounded shadow-md animate-pulse">
        <div className="h-12 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div> :
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] ps-4">
          {news.map((article, index) => (
            <NewsPreviewCard key={index} article={article} />
          ))}
        </div>
      }
    </div>
  );
}
