import { cn } from "@/utils/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn(
        "flex flex-col sm:flex-row bg-white rounded-lg shadow-lg shadow-black/20 w-full items-center overflow-hidden",
        className
    )}>
      {children}
    </div>
  );
};

export default Card;