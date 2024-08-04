'use client'
import {useState} from "react";
import Link from "next/link";
import {StatusModal} from "@/app/components/StatusModal";
const ContactForm = () => {
  const[user, setUser] = useState({
    username:"",
    email:"",
    phone:"",
    message:""
  })
  const [status, setStatus] = useState(null);
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevUser) => ({...prevUser, [name] : value}));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =  await fetch("/api/DataFetch" , {
        method:'POST',
        headers:{"Content_Type":"application/json"},
        body: JSON.stringify({
          username:user.username,
          email:user.email,
          phone:user.phone,
          message:user.message
        })
      })
      // Set the status based on the response from the API route
      if (response.status === 200) {
        setUser({
          username: "",
          email: "",
          phone: "",
          message: ""
        })
        setStatus('success');
      } else {
        setStatus('error');
      }
    }catch (e) {
      console.log(e)
    }
  }



  return (
      <>
        <div className="flex justify-center mt-5 p-6 bg-transparent rounded-xl backdrop-blur-md bg-blend-luminosity shadow-zinc-900 shadow-lg"
             style={{
               backgroundImage: 'linear-gradient(180deg, rgba(225, 225, 225, 0.1), rgba(5, 0, 0, 0.8))',
             }}>
          <form className={""} onSubmit={handleSubmit}>
            <div className={"text-neutral-400 text-sm font-bold md:text-md lg:text-md xl:text-md"}>
              <label htmlFor={"username"} className={"pl-2"}>
                Name <br/>
                <input className={"w-72 rounded-sm border-black border-2 text-black text-sm md:text-md lg:text-md xl:text-md px-2 bg-neutral-200"} type={"text"} name={"username"} placeholder={"Enter your name"} id={"username"}
                value={user.username}
                onChange={handleChange}

                required/>
              </label>
            </div>
            <div className={"text-neutral-400 text-sm font-bold md:text-md lg:text-md xl:text-md"}>
              <label htmlFor={"email"} className={"pl-2"}>
                Email <br/>
                <input className={"w-72 rounded-sm border-black border-2 text-black text-sm md:text-md lg:text-md xl:text-md px-2 bg-neutral-200"} type={"text"} name={"email"} placeholder={"Enter your email"} id={"email"}
                value={user.email}
                onChange={handleChange}

                required/>
              </label>
            </div>
            <div className={"text-neutral-400 text-sm font-bold md:text-md lg:text-md xl:text-md"}>
              <label htmlFor={"phone"} className={"pl-2"}>
                Contact no. <br/>
                <input className={"w-72 rounded-sm border-black border-2 text-black text-sm md:text-md lg:text-md xl:text-md px-2 bg-neutral-200"} type={"number"} name={"phone"} placeholder={"Enter your phone number"} id={"phone"}
                value={user.phone}
                onChange={handleChange}

                required/>
              </label>
            </div>
            <div className={"text-neutral-400 text-sm font-bold md:text-md lg:text-md xl:text-md"}>
              <label htmlFor={"message"} className={"pl-2"}>
                Message <br/>
                <textarea className={"w-72 rounded-sm border-black border-2 text-black text-sm md:text-md lg:text-md xl:text-md px-2 bg-neutral-200"} name={"message"} rows={8} placeholder={"Enter your message"} id={"message"}
                value={user.message}
                onChange={handleChange}
                autoComplete={"off"}
                required/>
              </label>
            </div>
            <div className={"text-center"}>
              {status === 'success' && <p className={"text-sm text-green-500"}>Thank you for your message!
              <StatusModal/>
              </p>
              }
              {status === 'error' && <p className={"text-sm text-red-500 "}>There was an error!</p>}
            </div>
            <div className={"flex items-center justify-center "}>
              <button className={"shadow-white shadow-2xl bg-indigo-800 font-bold w-52 mt-2 py-1 px-2 text-sm hover:bg-indigo-900 active:translate-y-0.5 border-black border "} type={"submit"}>Send Message</button>
            </div>
          </form>
        </div>
      </>
  );
};

export default ContactForm;