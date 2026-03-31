const SliderSkeleton = () => (
  <div className="w-full h-[580px] relative bg-[#0d0a14] animate-pulse overflow-hidden">
    <div className="absolute inset-0 skeleton" />
    <div className="absolute top-3 left-3 w-20 h-7 skeleton rounded-full" />
    <div className="absolute top-3 right-14 w-14 h-7 skeleton rounded-full" />
    <div className="absolute bottom-20 left-6 md:left-12 space-y-3">
      <div className="w-16 h-5 skeleton rounded-full" />
      <div className="w-72 md:w-96 h-10 skeleton rounded-xl" />
      <div className="w-48 h-4 skeleton rounded" />
      <div className="w-32 h-11 skeleton rounded-xl mt-2" />
    </div>
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`rounded-full skeleton ${i === 0 ? "w-6 h-2" : "w-2 h-2"}`} />
      ))}
    </div>
  </div>
);
export default SliderSkeleton;
