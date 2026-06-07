"use client";

import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setQuotes(data || []);
  }

  async function addQuote() {
    if (!quote || !author) {
      alert("Please fill all fields");
      return;
    }

    const { data, error } = await supabase
      .from("quotes")
      .insert([
        {
          quote,
          author,
          category,
        },
      ]);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    setQuote("");
    setAuthor("");
    setCategory("");

    fetchQuotes();
  }

  return (
    <div className="min-h-screen bg-[#800020] p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        ✨ InspireHub
      </h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <input
          className="w-full border-2 border-black p-2 mb-3 text-black bg-white rounded"
          placeholder="Enter Quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />

        <input
          className="w-full border-2 border-black p-2 mb-3 text-black bg-white rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="w-full border-2 border-black p-2 mb-3 text-black bg-white rounded"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          onClick={addQuote}
          className="w-full bg-[#800020] text-white p-2 rounded font-semibold"
        >
          Add Quote
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-8">
        {quotes.map((item) => (
          <div
            key={item.id}
            className="bg-white border-l-4 border-[#800020] p-4 rounded-xl shadow mb-4"
          >
            <h2 className="text-xl font-semibold text-black">
              "{item.quote}"
            </h2>

            <p className="mt-2 text-black">
              👤 <strong>{item.author}</strong>
            </p>

            <p className="text-black">
              🏷️ {item.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}