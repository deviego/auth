'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { SyntheticEvent, useState } from "react";


export default  function Home() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  async function handleSubmit(event : SyntheticEvent){ 
    event.preventDefault()

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if(result?.error){
      console.log(result)
      return
    }
    router.replace('/admin')
  }
  return (
  <div className=' flex flex-col items-center justify-center h-screen w-full'>
    <h1 className='text-bold text-3xl pb-4'>Login</h1>
    <form className='flex flex-col gap-6 w-[400px]' onSubmit={handleSubmit}>
      <input type="text"  name='email' placeholder='Digite seu email' className='h-12 rounded-md p-2 bg-transparent border border-gray-300 ' onChange={(e) => setEmail(e.target.value)} />
      <input type="text"  name='password' placeholder='Digite sua senha' className='h-12 rounded-md p-2 bg-transparent border border-gray-300 ' />
      <button type="submit" className='h-12 bg-gray-300 rounded-md text-blue-950 '>Entrar</button>
    </form>

  </div>
  )
}
