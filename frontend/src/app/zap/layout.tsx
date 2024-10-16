'use client'


import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import FullPageLoader from "@/components/FullPageLoader";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const router = useRouter()
  const {isLoading, isAuthenticated} = useAuth();
   
  if(isLoading){
    return <FullPageLoader/>
  }
 
  if(!isAuthenticated){
    router.push("/")
  }

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
