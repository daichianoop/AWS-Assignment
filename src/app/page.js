import React from 'react';
import ContactForm from "@/app/components/ContactForm"

const Page = () => {
  return (
      <>
        <div className={"bg-[url('/bg-div-9.jpg')] bg-opacity-0 bg-cover h-screen w-screen"}>
          <div className={"text-white h-screen w-screen pt-20 px-20"}
               style={{
                 backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.9))',
               }}>
            <div className={"text-2xl md:text-3xl lg:text-3xl xl:text-3xl text-center font-bold "}>We&#39;d love to hear <span className={"text-indigo-800"}>from you</span>
            </div>
            <div className={"flex items-center justify-center"}>
              <ContactForm/>
            </div>
          </div>
        </div>
      </>
  );
};

export default Page;