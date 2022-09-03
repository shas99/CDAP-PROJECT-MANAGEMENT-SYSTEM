/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'


function Calibre() {
    return (

      
   <div className=' bg-gray-900'>
    
    <div id='navigation-bar' className=' h-[5rem] bg-gradient-to-r from-blue-900 '>
    <nav class="p-3 bg-gradient-to-r from-blue-900 border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[5rem]">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
    <a href="#" class="flex items-center">
        <img src="https://media.discordapp.net/attachments/929308623853723678/994252147799625768/Screenshot_2022-07-06_at_20.12.37.png" className="mr-3 h-6 sm:h-10 rounded" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap text-white font-sans text-4xl font-bold">Calibre</span>
    </a>
    <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500" aria-controls="navbar-solid-bg" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul class="flex flex-col mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-1 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        <li>
          <button className='text-white bg-[#24292F] hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2'><a href="/adminLogin" aria-current="page">Login As Admin</a></button>
        </li>
        <li>
          <button className='text-white bg-[#24292F] hover:hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2'><a href="/stafflogin">Login As Staff</a></button>
        </li>
        <li>
        <button className='text-white bg-[#24292F] hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2'><a href="/login">Login As Student</a></button>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>

    <div id='hero-section' className='   h-[40rem] bg-gray-900'>
        Chathushka 

        <h1 className=' text-7xl text-slate-50 font-extrabold mt-[6rem] ml-[10rem] '>
            Lets get started !<br/> Its now or never
        </h1>
<br/>
        <p className=' text-2xl  font-bold text-gray-500  ml-[10rem]'>
            CDAP platform  empowers project roadmap <br/>to actual motivated software,  Inspiring students and lecturers 
        </p>
        <br/><br/><br/>
       {/* <div>
            <img  src="https://media-exp2.licdn.com/dms/image/C560BAQEIerI4wDXA3w/company-logo_200_200/0/1643683606424?e=2147483647&v=beta&t=9SnPqaf6jG4vAoup_dlhdanepjK2ALMhU-Qicgjz0ZY" width="200" height="200" className='ml-[10rem]  rounded w-[5rem] h-[5rem]' />
            </div> */}
        

        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-[10rem]  mt-[rem]'> <a href='https://www.sliit.lk/'>Visit SLIIT Portal</a>  </button>

        <div id='hero-image'>
            <img src='https://static.sliit.lk/wp-content/uploads/2018/10/02051658/SLIIT-Building.jpg' className='w-[30rem] h-[40rem] ml-[64rem] mt-[-29rem]'/>

            
        </div>

        <div id='statistic-row ' className='bg-black-400 h-[80rem]'>
            <hr className='mt-[6rem] w-[70rem] ml-[9rem] border-gray-700 '/>
                 <p className='ml-[20rem] text-3xl text-white font-serif font-extrabold mt-[2rem]'>
                200+ <br/>Students
                </p>
                <p className='ml-[40rem] text-3xl text-white font-serif font-extrabold mt-[-4.5rem]'>
                40+ <br/> Lecturers
                </p>
                <p className='ml-[60rem] text-3xl text-white font-serif font-extrabold mt-[-4.7rem]'>
                4+ <br/> Panels
                </p>
                
                    

        </div>
    </div>

    <div id='information-section' className='bg-slate-600 h-[30rem]' >
        Pasindu
    </div>
    <div id='services-section' className='bg-slate-700 h-[30rem]' >
        Shasvathan
    </div>

    <div id='below-section' className='bg-slate-800 h-[30rem]' >
        Buddisha
    </div>




   </div>
    
 
 
        
    )
}

export default Calibre


