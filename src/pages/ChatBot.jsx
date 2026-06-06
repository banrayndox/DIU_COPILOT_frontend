import React, { useState, useRef, useEffect } from "react"
import { socket } from "../store/socket.js"
import { FiMoreVertical, FiLogOut } from "react-icons/fi"
import { FaQuestionCircle, FaUserPlus } from "react-icons/fa"
import { MdFeedback, MdInfo } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { useClerk, useAuth } from "@clerk/clerk-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {

  const { getToken } = useAuth()
  const { signOut } = useClerk()
  const navigate = useNavigate()
  const endRef = useRef(null)
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null); 
  const [remaining, setRemaining] = useState(20)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I'm DIU Copilot. How can I help you today?"
    }
  ])

  const [logs, setLogs] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [input, setInput] = useState("")

  // -----------------------------
  // AUTO SCROLL
  // -----------------------------
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  useEffect(() => {

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = (event) => {

    const transcript = event.results[0][0].transcript;

    setInput(transcript); // 👈 voice → input field
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognitionRef.current = recognition;

}, []);

const handleVoice = () => {

  if (!recognitionRef.current) return;

  if (isListening) {
    recognitionRef.current.stop();
    setIsListening(false);
  } else {
    recognitionRef.current.start();
    setIsListening(true);
  }
};
  // -----------------------------
  // SOCKET LISTENERS (STREAM)
  // -----------------------------
 useEffect(() => {

  socket.on("aiChunk", (token) => {

    setMessages(prev => {
      const copy = [...prev]
      copy[copy.length - 1].text += token
      return copy
    })

  })

  // 🧠 LOG EVENT (NEW)
  socket.on("log", (msg) => {

    setLogs(prev => [...prev, msg])

  })

  // 🧠 FINAL RESPONSE
  socket.on("aiEnd", () => {

    console.log("AI finished")

    // 🔥 clear logs when final comes
    setLogs([])
    setIsStreaming(false)
  })

  socket.on("aiError", (err) => {
    console.error(err)
    setIsStreaming(false)
  })

  return () => {
    socket.off("aiChunk")
    socket.off("log")
    socket.off("aiEnd")
    socket.off("aiError")
  }

}, [])

  // -----------------------------
  // SEND MESSAGE (SOCKET)
  // -----------------------------
  const handleSend = async () => {

    const token = await getToken()

    if (!input.trim()) return

    const userText = input
    setInput("")

    // 🔥 RESET LOGS + START STREAM
    setLogs([])
    setIsStreaming(true)

    setMessages(prev => [
      ...prev,
      { role: "user", text: userText },
      { role: "bot", text: "" }
    ])

    socket.emit("sendMessage", {
      text: userText,
      userId: "123",
      token
    })
  }
  const go = (path) => {
    setSidebarOpen(false)
    navigate(path)
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="h-screen flex flex-col hide-scrollbar bg-gradient-to-b from-[#0a0a0a] via-[#111] to-black text-white relative">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-5 py-3 border-b border-white/10">

        <h1 className="flex items-center gap-2 text-sm font-semibold">
          DIU Copilot <span className="text-[10px] text-gray-400">beta</span>
        </h1>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <FiMoreVertical />
        </button>

      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 md:px-40 py-6 space-y-5">
       {isStreaming && (
          <div className="text-xs text-blue-400 animate-pulse mb-2">
            AI is thinking...
          </div>
        )}
       
        {logs.length > 0 && (
            <div className="space-y-1 mb-4">
              {logs.map((l, i) => (
                <div
                  key={i}
                  className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-md"
                >
                        {l}
                      </div>
                    ))}
                  </div>
                )}


        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >

            <div className={`max-w-[80%] text-sm px-4 py-3 rounded-2xl
              ${msg.role === "user"
                ? "bg-[#2b2b2b] rounded-br-none"
                : "bg-white/10 rounded-bl-none"
              }`}>

              <div className="prose prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>

            </div>

          </div>
        ))}

        <div ref={endRef} />
      </div>

      {/* INPUT */}
<div className="p-4 flex justify-center">

  <div className="w-full max-w-3xl flex items-end gap-2 bg-white/10 p-2 rounded-2xl border border-white/10">

<textarea
  className="
    flex-1
    bg-transparent
    outline-none
    text-sm
    px-3 py-2
    resize-none
    max-h-[150px]
    overflow-y-auto
    disabled:opacity-50

    /* 🔥 scrollbar hide */
    [scrollbar-width:none]
    [-ms-overflow-style:none]
  "
  value={input}
  onChange={(e) => {
    setInput(e.target.value);

    // auto resize logic
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSend();
    }
  }}
  disabled={remaining <= 0}
  placeholder={
    remaining <= 0
      ? "Daily limit exceeded"
      : isListening
        ? "Listening..."
        : "Message DIU Copilot..."
  }
  rows={1}
  className="
    flex-1
    bg-transparent
    outline-none
    text-sm
    px-3
    resize-none
    max-h-[150px]
    overflow-y-auto
    disabled:opacity-50
  "
/>

{/* 🎤 VOICE BUTTON */}
<button
  onClick={handleVoice}
  disabled={remaining <= 0}
  className={` flex items-end px-3 py-2 rounded-xl transition flex items-center justify-center
    ${isListening
      ? "bg-red-500 text-white animate-pulse"
      : "bg-white text-black"
    }`}
>
  {isListening ? (
    <FaMicrophone className="text-lg" />
  ) : (
    <FaMicrophone className="text-lg" />
  )}
</button>

{/* SEND BUTTON */}
<button
  onClick={handleSend}
  disabled={remaining <= 0}
  className=" flex items-end px-4 py-2 bg-white text-black rounded-xl hover:scale-105 transition disabled:opacity-50 flex items-center justify-center"
>
  <FaPaperPlane className="text-lg" />
</button>

  </div>

</div>

      {/* BACKDROP */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 bg-black/50"
        />
      )}

      {/* SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#111] border-l border-white/10
        transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>

        <div className="p-4 border-b border-white/10">
          <h2 className="text-sm font-semibold">Menu</h2>
        </div>

        <div className="p-4 text-sm text-gray-400">
          Remaining: {remaining}/20
        </div>

        <div className="absolute bottom-0 w-full p-3 border-t border-white/10 space-y-2 text-sm">

          <button onClick={() => go("/faq")} className="menuBtn">
            <FaQuestionCircle /> FAQ
          </button>

          <button onClick={() => go("/feedback")} className="menuBtn">
            <MdFeedback /> Feedback
          </button>

          <button onClick={() => go("/not-human")} className="menuBtn">
            <MdInfo /> Not Human
          </button>

          <button onClick={() => go("/apply")} className="menuBtn">
            <FaUserPlus /> Join Us
          </button>

          <button
            onClick={signOut}
            className="flex items-center gap-2 text-red-400"
          >
            <FiLogOut /> Logout
          </button>

        </div>

      </div>

    </div>
  )
}

export default Chatbot