'use client'

import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import React, { useState, useEffect } from "react";
import { FormEvent } from 'react'

const upload = () => {
    const [domLoaded, setDomLoaded] = useState(false);

    // useEffect(() => {
    //     setDomLoaded(true);
    // }, []);


    async function onSubmit(FormEvent) {
      FormEvent.preventDefault()
   
      const formData = new FormData(FormEvent.currentTarget)
      const response = await fetch('/api/catalog', {
        method: 'GET',
       // body: formData,
      })
   
      // Handle response if necessary
     // const data = await response.json()
      // ...
    }

    async function onSubmitDelete(FormEvent) {
      FormEvent.preventDefault()
   
      const formData = new FormData(FormEvent.currentTarget)
      const response = await fetch('/api/catalog', {
        method: 'DELETE',
        //body: formData,
      })
   
      // Handle response if necessary
     // const data = await response.json()
      // ...
    }

    return (
      
        <div>
          
            <Menu />
            
            <div className="flex justify-between mx-14 mt-72">
            <form  onSubmit={onSubmit}>
                <button
                    type="submit"
                    class="ml-14 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Upload price
                </button>
            </form>
            <form  onSubmit={onSubmitDelete}>
                <button
                    type="submit"
                    class="ml-14 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                    Delete price
                </button>
            </form>
            </div>
            <Footer />
            
        </div>
      
    );
};

export default upload;
