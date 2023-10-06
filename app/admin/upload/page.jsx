import Footer from '@/components/Footer'
import Menu from '@/components/Menu'
import React from 'react'

const upload = () => {
  return (
    <>upload
    <Menu></Menu>

    <div className='mt-14'><form action="/api/catalog">

<button type='submit'></button>

</form></div>

<form action="/api/catalog">

<button type="submit" class="ml-14 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload price</button>

</form>


    <Footer></Footer>
    </>
  )
}

export default upload