
export default function HeroVideo() {
  return (
    <div className="w-full flex justify-center mt-3">
  <video autoPlay={true}
         loop={true} 
         muted={true} 
         src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4" 
         title="Tame the chaos with Zapier" 
         className="w-11/12 h-[650px]">
          {/* <source/> */}
  </video>
</div>

  )
}
