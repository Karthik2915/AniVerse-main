const SliderSkeleton = () => {
  return (
    <div className="w-full h-[540px] gap-3 mb-28 flex-shrink-0 relative bg-black animate-pulse">
      {/* Black Screen for Image */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Title SliderSkeleton */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <div className="w-40 md:w-64 h-6 md:h-10 bg-gray-700 rounded-md animate-pulse" />
      </div>

      {/* Genre SliderSkeleton */}
      <div className="absolute bottom-20 left-4 md:bottom-24 md:left-8">
        <div className="w-60 md:w-80 h-4 bg-gray-700 rounded-md animate-pulse" />
      </div>

      {/* More Info Button SliderSkeleton */}
      <div className="absolute bottom-6 left-4 md:bottom-12 md:left-8">
        <div className="w-28 md:w-40 h-8 bg-gray-700 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export default SliderSkeleton;
