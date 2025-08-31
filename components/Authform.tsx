"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { auth } from "@/firebase/client";
import { signUp,signIn } from "@/lib/actions/auth.action"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
    
  }),
email: z.string().email({ message: "Invalid email address" }),
  password:z.string()
})
 type FormType = "signin" | "signup";
const AuthForm = ({ type }: { type: FormType }) => {
  const router=useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
     if(type==="signup"){
      const{email, username, password}=values;
   const usercredentials=await createUserWithEmailAndPassword(auth,email,password);
const result =await signUp({
  uid:usercredentials.user.uid,
  username:username!,
  email,
  password
});
if(!result.success){
  alert('error')
  return
}
router.push('/signin')
     }
     else{
      const{email,password}=values;
      const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken=await userCredential.user.getIdToken();
        if(!idToken){
          alert('signin failed')
          return;
        }
        await signIn({
          email,
          idToken
        })
        router.push('/')
     }
    }
    catch(error){
      console.error(error);

    }
   
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                enter email
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                enter password
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AuthForm
