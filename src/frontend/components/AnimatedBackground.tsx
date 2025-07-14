function AnimatedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-[#F15A24]/20 to-[#FBB03B]/20 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-24 right-24 w-56 h-32 bg-gradient-to-tr from-[#ED1E79]/20 to-[#522785]/20 rounded-3xl blur-2xl animate-float-rotate delay-700"></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-[#29ABE2]/20 to-[#F15A24]/15 blur-xl animate-float-triangle delay-300" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-gradient-to-br from-[#522785]/15 to-[#ED1E79]/15 blur-xl animate-float-polygon delay-1000" style={{clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)'}}></div>
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-[#FBB03B]/20 to-[#F15A24]/20 rounded-full blur-xl animate-float delay-500"></div>
      <div className="absolute bottom-1/3 right-1/2 w-16 h-16 bg-gradient-to-br from-[#29ABE2]/20 to-[#522785]/20 blur-lg animate-float-diamond delay-1200" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-fade"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F15A24]/30 to-transparent animate-line-sweep"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ED1E79]/30 to-transparent animate-line-sweep delay-2000"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#29ABE2]/30 to-transparent animate-line-sweep-vertical delay-1000"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#522785]/30 to-transparent animate-line-sweep-vertical delay-3000"></div>
      </div>
    </div>
  );
}

export default AnimatedBackground; 