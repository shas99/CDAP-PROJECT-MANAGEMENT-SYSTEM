/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import "./Calibrebuddhisha.css"
// import {
//     MDBFooter,
//     MDBContainer,
//     MDBIcon,
//     MDBInput,
//     MDBCol,
//     MDBRow,
//     MDBBtn
//   } from 'mdb-react-ui-kit';


function Calibre() {
    return (

      
   <div className=' bg-gray-900'>
    
    <div id='navigation-bar' className=' h-[5rem] bg-gradient-to-r from-blue-900 mt-50rem'>
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
            <img src='https://static.sliit.lk/wp-content/uploads/2018/10/02051658/SLIIT-Building.jpg' className='w-[34rem] h-[40rem] ml-[62rem] mt-[-29rem] overflow-hidden'/>

            
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

    <div id='information-section' className='bg-slate-600 w-full  h-[auto] border-2 border-solid border-blue-900 mt-[16rem]' >
        <div className="inline-block w-full h-auto border-2 border-solid border-red-900"> 
            <div className="flex lg:w-2/3 float-left border-solid border-2 border-green-600">
            <img src="https://cdn.discordapp.com/attachments/929308623853723678/1015512673384939540/Milestones.jpg" width="94%" height="auto" style={{marginLeft:"3%", marginTop:"20px", marginBottom:"20px"}}></img>

            </div>
            <div className="flex lg:w-1/3 float-right border-solid border-2">
            <p className="w-full h-full">This is sample data for now</p>
            </div>
        </div>    

        <div className="inline-block w-full h-auto border-2 border-solid border-red-900"> 
            <div className="flex lg:w-2/5 float-left border-solid border-2">
            <p className="w-full h-full">This is sample data for now</p>
            </div>

            <div className="flex lg:w-3/5 float-right border-solid border-2 border-green-600">
            <img src="https://cdn.discordapp.com/attachments/929308623853723678/1015512673619824700/Assesments.jpg" className="" width="90%"  style={{marginBottom:"15px", marginLeft:"5%"}}></img>

            </div>
            
        </div>    
        {/* <div className="w-full border-2 border-solid border-red-900">
            <div className="flex lg:w-2/3 float-right border-solid border-2 h-auto">
            <img src="https://cdn.discordapp.com/attachments/929308623853723678/1015512673619824700/Assesments.jpg"  className="w-80% h-auto"></img>

            </div>
            <div className="flex lg:w-1/3 float-left border-solid border-2">
            <p className="w-full h-full">This is sample data for now</p>
            </div>
        </div>     */}
    </div>
    <div id='services-section' className='bg-slate-700 h-[30rem]' >
     &nbsp;
    <div>

    <center className='mt-20 ml-[0rem] text-3xl text-white font-serif font-extrabold'>Services</center>
    </div>
        
      <div>
        <button class="mt-20 ml-[8rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[16rem]">
          Schedule meetings
        </button>
        <button class="ml-[10rem] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-[16rem]">
          Get Supervisor suggestions
        </button>
        <button class="ml-[10rem] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-[16rem]">
          Submit project ideas
        </button>
      </div>
      <br/>
      <div>
        <button class="mt-10 ml-[8rem] bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded w-[16rem]">
          Customise rubrics
        </button>
        <button class="ml-[10rem] bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded w-[16rem]">
          View Your grades
        </button>
        <button class="ml-[10rem] bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded w-[16rem]">
          Customisable forms
        </button>

      </div>
      <br/>
      <div>
        <button class="mt-10 ml-[8rem] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-[16rem]">
          Register to group
        </button>
        <button class="mt-10 ml-[10rem] bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded w-[16rem]">
          Notify students
        </button>
        <button class="ml-[10rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[16rem]">
          Bid for projects
        </button>

      </div>
    </div>

    <div id='below-section' className='bg-slate-800 h-[30rem]' >

        Buddisha
        <p className="footer">Calibre project management system is dedicated to helping students and lectures efficiently manage
        the 4th year SLIIT Research projects , and provides many services and facilities such as topic registration, submission configurations
        , group registration, rubric marking , teams meeting scheduling and many more. 

        
        
        
        
         </p>
         <br></br>
         <p className="footer">You can sign up as a student, staff member or admin</p>
         

         <div lg='3' md='6' className='mb-4 mb-md-0'>
              <h5  className='text-uppercase ml-[50rem] text-white'> Useful Links</h5>
              <br></br>

              <ul className='list-unstyled mb-0 ml-[70rem]'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 5
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 6
                  </a>
                </li>
              </ul>
              </div>

              <div  lg='3' md='6' className='mb-4  md:align-top'>
           

              <ul className='list-unstyled mb-0 mt-[-10rem] ml-[50rem]'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 5
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 6
                  </a>
                </li>
              </ul>
            </div>


            <div  lg='3' md='6' className='mb-4 mt-[-10rem] md:align-top'>
           

              <ul className='list-unstyled mb-0 mt-[-7rem] ml-[30rem]'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 5
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 6
                  </a>
                </li>
              </ul>
            </div>

           


            </div>
            <br></br>

            <div class="grid md:grid-cols-3 text-white gird-cols-1 gap-4 flex justify-center mt-[-8rem] ml-[20rem] items-center">
          <div class="md:ml-auto md:mb-6">
            <p class="">
              <strong>Sign up for our newsletter</strong>
            </p>
          </div>
          </div>

          <div class="md:mb-6 ml-[45rem] mt-[-4rem]" >
            <input
              type="text"
              class="
                form-control
                block
                w-10px
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              id="exampleFormControlInput1"
              placeholder="Email address"/>
          </div>


          
         
    </div>




 
 
        
    )
}

export default Calibre


