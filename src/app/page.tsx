"use client"; // Add this at the top

import Image from "next/image";
import { useState, useEffect } from "react";
import NewsPreviewCard from "../components/NewsPreviewCard";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news-headlines");

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseDate = await response.json();
        console.log(response.ok);
        setNews(responseDate.data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (!query.trim()) return; // Avoid empty queries

    setLoading(true);

    try {
      // Fetch articles from the Everything API
      const response = await fetch(
        `/api/news-search/${encodeURIComponent(query)}`
      );
      const responseDate = await response.json();

      setNews(responseDate.data.articles || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading Headlines...</p>;

  return (
    <div>
      <div id="newsletter-banner" className=" top-0 start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center flex-shrink-0 w-full mx-auto sm:w-auto">
            <form onSubmit={handleSearch} className="flex flex-col items-center w-full md:flex-row">
                <label className="flex-shrink-0 mb-2 me-auto text-sm font-medium text-gray-500 md:mb-0 md:me-4 dark:text-gray-400 md:m-0">Search Latest News</label>
                <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" id="text" placeholder="Search Title" className="bg-white border border-gray-300 text-gray-900 md:w-64 mb-2 md:mb-0 md:me-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </form>
        </div>
      </div>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] ps-4">
        {news.map((article, index) => (
          <NewsPreviewCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}
