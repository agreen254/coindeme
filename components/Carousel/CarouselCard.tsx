const CarouselCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col basis-[50%] mb-4 w-56 border rounded-md">
      {children}
    </div>
  );
};

export default CarouselCard;
