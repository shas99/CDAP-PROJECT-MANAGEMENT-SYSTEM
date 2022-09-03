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

      
   <div className=' bg-gray-900 h-[275rem]' >
    
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
        &nbsp; 

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

    <div id='information-section' className='bg-slate-800 w-full  h-[auto] mt-[16rem]' >
        <div>
           <p className="w-full py-4 text-5xl font-serif font-extrabold  font-bold text-white text-center pt-10 pb-10"> What is the procedure ?</p>
        </div>
        <div className="inline-block w-full h-auto "> 
            <div className="flex lg:w-2/3 float-left ">
            <img src="https://cdn.discordapp.com/attachments/929308623853723678/1015512673384939540/Milestones.jpg" width="94%" height="auto" className="shadow-xl shadow-slate-900 border-2 border-radius-5 animate-pulse" style={{marginLeft:"3%", marginTop:"20px", marginBottom:"20px",borderRadius:"8px"}}></img>

            </div>
            <div className="relative lg:w-1/3 float-right mt-14 pb-10">
            <div className="lg:w-[28rem] bg-slate-900 pt-5 pb-9 shadow-xl shadow-gray-800" style={{borderRadius:"6px"}}> 
            <p className="text-center w-full mt-5 text-white font-serif text-xl font-extrabold  font-bold">The Research Project Milestones</p>
            <p className="text-center w-full mt-10 text-white text-serif text-md">Students have to do some stuff before the 4<sup>th</sup> year first <br/>semester. They should engage to workshops and <br/>after that select a supervisor for their 
            Research. After<br/> that they should Search about a Research Title and Fill<br/>  out the Topic Assesment Form. After that students should <br/> upload the Charter Documment. </p>
            <p className="text-center w-full mt-10 text-white text-serif text-md">In 4<sup>th</sup> year 1<sup>st</sup> semester students must submit and present<br/> Project Proposel and end of the semester <br/>
            publish the Research Paper.</p>
            <p className="text-center w-full mt-10 text-white text-serif text-md">In 4<sup>th</sup> year 2<sup>nd</sup> semester Students must do the<br/> Final Evaluation and Finishing.</p>
            </div>
            </div>
        </div>    
        <hr style={{width:"96%",margin:"auto",borderWidth:"2px", borderColor:"gray",marginTop:"5px",marginBottom:"5px"}}></hr>
        <div className="inline-block w-full h-auto pb-10"> 
        <div className="relative lg:w-1/3 float-left mt-64 ml-auto pb-10">
            <div className="lg:w-[28rem] bg-slate-900 pt-5 pb-9 shadow-xl shadow-gray-800 ml-auto" style={{borderRadius:"6px"}}> 
            <p className="text-center w-full mt-5 text-white font-serif text-xl font-extrabold  font-bold">Get an clear idea about Milestones</p>
            <p className="text-center w-full mt-6 text-white text-serif text-md">You can get a proper idea about Milestones by<br/> studying this Diagram.
            </p></div>
            </div>

            <div className="flex lg:w-3/5 float-right">
            <img src="https://cdn.discordapp.com/attachments/929308623853723678/1015512673619824700/Assesments.jpg"  className="shadow-xl shadow-slate-900 animate-pulse " style={{ marginTop:"20px", marginBottom:"20px",borderRadius:"8px",width:"97%",height:"auto"}}></img>

            </div>
            
        </div>    
        
        

    </div>
    <div id='services-section' className='bg-slate-700 h-[40rem]' >
     &nbsp;
    <div>

    <center className='mt-[-70] ml-[0rem] text-7xl text-white font-serif font-extrabold  '>Services</center>
    </div>
        
      <div className='ml-20 mt-[1rem]' >
        <div className=" block p-2 w-3/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ml-10">
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans text-center'>Schedule meetings</h5>
          <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
    </p>
        </div>

        <br></br>
        <div className="block p-2 w-3/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ml-10">
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans text-center'>Get Supervisor suggestions</h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
    </p>
        </div>
        <br></br>
        <div className="block p-2 w-3/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ml-10">
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans text-center'>Submit project ideas</h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
    </p>
        </div>
        
      </div>
      <br/>
      <div style={{marginTop:"-437px",marginLeft:"500px"}}>
        <div className="block p-2 w-5/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans text-center'>Customise rubrics</h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
    </p>
        </div>
        <br></br>
        <div className="block p-2 w-5/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans text-center'>View Your grades</h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
    </p>
        </div>
        <br></br>
        <div className="block p-2 w-5/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans text-center'>Customisable forms</h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
    </p>
        </div>

      </div>
      <br/>
      
      <div style={{marginTop:"-438px",marginLeft:"950px"}}>
        <div className="block p-2 w-9/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans text-center'>Register to group</h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
    </p>
        </div>
        <br></br>
        <div className="block p-2 w-9/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans text-center'>Notify students</h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
    </p>
        </div>
        <br></br>
        <div className="block p-2 w-9/12 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-sans text-center'>Bid for projects</h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
    </p>
        </div><br></br>

      </div>
      <br></br>
    </div>
    

    <div id='below-section' className='bg-slate-800 h-[30rem] ' >

        Buddisha
        <p className="footer text-white ml-[2rem] mt-[2rem]">Calibre project management system is dedicated to helping students and lectures efficiently manage
        the 4th year SLIIT Research projects , and provides many services and facilities such as topic registration, submission configurations
        , group registration, rubric marking , teams meeting scheduling and many more. 
        Admin features include available project management, configuring the marking, configuring the submissions, viewing groups and placing
        announcements. Staff features include adding marks and viewing their biddings. Student features include viewing marks and features, viewing their
        matched supervisors and submitting files.

        
        
        
        
         </p>
         <br></br>

         

         <div lg='3' md='6' className='mb-4 mb-md-0 '>
              <h5  className='text-uppercase ml-[30rem] text-white'> <strong>Useful Links</strong></h5>
              <br></br>

              <ul className='list-unstyled mb-0 ml-[20rem]'>
                <li>
                  <a href='#!' className='text-white'>
                    Staff
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Students
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Research Project coordinators
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Alumni
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                   Student Achievements
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Popular Research interests
                  </a>
                </li>
              </ul>
              </div>

              <div  lg='3' md='6' className='mb-4  md:align-top'>
           

              <ul className='list-unstyled mb-0 mt-[-10rem] ml-[60rem]'>
                <li>
                  <a href='#!' className='text-white'>
                    Our sponsored internships
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Our head office
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Our developer team
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Best technology stacks
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Best project web frameworks
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    About Us
                  </a>
                </li>
              </ul>
            </div>


            <div  lg='3' md='6' className='mb-4 mt-[-10rem] md:align-top'>
           

              <ul className='list-unstyled mb-0 mt-[-7rem] ml-[40rem]'>
                <li>
                  <a href='#!' className='text-white'>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    File a complaint
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Help and Support
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Our Chat Bot
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Our campaigns
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                   Coding contests and hackathons
                  </a>
                </li>
              </ul>
            </div>

           


            </div>
            <br></br>
            <br></br>
            <br></br>
            
            <br></br>
            <br></br><br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="grid md:grid-cols-3 text-white gird-cols-1 gap-4 flex justify-center mt-[-11rem] ml-[20rem] items-center">
          <div class="md:ml-auto md:mb-6 mt-[7rem]">
            <p class="mt-[-5rem]">
              <strong>Sign up for our newsletter</strong>
            </p>
          </div>
          </div>
          <br></br><br></br>

          <div class="md:mb-6 ml-[30rem] mt-[-8rem]" >
            <input
              type="text"
              class="
                form-control
                block
                w-5px
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

          

          <div class="flex space-x-2 justify-center ml-[25rem] mt-[-4rem]">
  <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Subscribe</button>
</div>








          
         
    </div>



  
 
 
        
    )
}

export default Calibre


