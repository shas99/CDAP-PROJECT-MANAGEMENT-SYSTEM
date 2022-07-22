/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

export default function 
() {
  return (
    <div>
        <body class="bg-black">
    

    <div class="flex items-center h-screen bg-cover bg-center justify-center bg-[url('https://cdn.discordapp.com/attachments/938131839661539339/994206950667583488/Log_banner_02.webp')]">
        <div class="w-3/4  items-center">
            <div class="grid xl:grid-cols-2 items-center">
                <div class="text-white md:ml-20">
                    <img class='w-10 mb-3' src="https://cdn.discordapp.com/attachments/938131839661539339/973611175168327740/Favi.png" alt=""/>
                    <h1 class="text-gray-400">
                       <span class="font-bold text-blue-500">Leo Club of SLIIT</span>  Portal
                    </h1>
                    <h1 class="text-4xl font-bold ">
                        Sign in to your account<span class="text-blue-500">.</span>
                    </h1>
                    <h3 class="mt-3 text-gray-500">
                        Already not a member? <a href="register.php" class="text-blue-400 font-semibold">Sign up</a>
                    </h3>
                    
                    <div>
                        <form action="login.php" method="POST" class="mt-5">
                            <div class="space-y-3">
                              <div class="relative">
                                <h1 class="absolute left-2 top-1 text-xs text-blue-400">SLIIT ID</h1>
                                <input type="text" name="uname"  class="pt-5 pl-2 pb-1 w-80 rounded-lg  border border-indigo-500 placeholder-gray-600 bg-black bg-opacity-50 " placeholder="IT202XXXXXXX" oninput="this.value = this.value.toUpperCase()" required/>
                              </div>
    
                              <div class="relative">
                                <h1 class="absolute left-2 top-1 text-xs text-blue-400">NIC</h1>
                                <input type="password" name="password"  class="pt-5 pl-2 pb-1 w-80 rounded-lg  border border-indigo-500 placeholder-gray-600 bg-black bg-opacity-50 " placeholder="19256897895V" oninput="this.value = this.value.toUpperCase()" required/>
    
                              </div>
                                                            <h1 class="text-gray-500 text-xs">Need support?  <a href="" class="font-semibold text-gray-300">Click here</a></h1>
    
                              <input class="bg-indigo-500 px-5 py-1.5 rounded-lg" type="submit" value="Sign in"/>
                                
                               
                            </div>
                            
                        </form>
                    </div>
                </div>

                <div class="relative hidden border bg-cover h-96 rounded-xl text-right">
                    <button class="bg-gray-900 absolute bottom-3 right-0 py-1.5 px-5 font-semibold text-white">
                        Leo Club of SLIIT
                    </button>
                </div>
                
            </div>
          
        </div>
        
    </div>

</body>
        
    </div>
  )
}
