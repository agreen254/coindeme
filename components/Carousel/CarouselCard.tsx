const CarouselElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center basis-full mb-4 w-56 border bg-teal-900/80 rounded-md">
      {children}
    </div>
  );
};

export default CarouselElement;
