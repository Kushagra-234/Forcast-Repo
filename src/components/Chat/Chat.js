import React from "react";
import "./chat.css";

import Card from "../Card/Card";

import { useState, useEffect } from "react";

import { supabase } from "../supabaseclient";




export default function Chat() {

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState({ username: "", content: "" });

  const { username, content } = message;
  useEffect(() => {
    const profiles = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "profiles" },
        (payload) => {
          console.log({ payload });
          payload &&
            setMessages((oldMessages) => [...oldMessages, payload.new]);
        }
      )
      .subscribe();
    return () => {
      profiles.unsubscribe();
    };
  }, []);

  useEffect(() => {
    Init();
  }, []);
  // console.log(message);

  //Seleciona a tabela PROFILES e joga o retorno para dentro de MESSAGES
  async function Init() {
    const { data: profiles } = await supabase.from("profiles").select("*");
    if (profiles == null) return;
    setMessages(profiles);
  }

  //Insere USERNAME e CONTENT dentro da tabela
  async function createPost() {
    const { data } = await supabase
      .from("profiles")
      .insert([{ username, content }])
      .single();
    setMessage({ username: message.username, content: message.content });
    Init();
    submit();
    console.log(messages);
    console.log(data);
  }

  function submit() {
    localStorage.setItem("name", message.username);
    localStorage.setItem("content", message.content);
  }

  console.log(message);

  return (
    <div className="container">
      <div className="separator">
        {messages?.map((message) => (
          <div className="card" key={message.id}>
            <div className="image-name">
              <img
                className="image"
                src={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                alt="image"
              />
              <p className="name">{message.username}</p>
            </div>
            <div className="content">
              <p className="text">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="form">
        <div className="username">
          <input
            className="input input1"
            id="name"
            autoCapitalize="on"
            placeholder="Enter Username"
            value={localStorage.getItem(message.username)}
            onChange={(e) =>
              setMessage({ ...message, username: e.target.value })
            }
          />
        </div>
        <div className="msgcontent">
          <input
            id="message"
            className="input"
            placeholder="Message"
            value={localStorage.getItem(message.content)}
            onChange={(e) =>
              setMessage({ ...message, content: e.target.value }) 
            } 
          />
        </div>
        <button className="button" onClick={createPost}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-send"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}
