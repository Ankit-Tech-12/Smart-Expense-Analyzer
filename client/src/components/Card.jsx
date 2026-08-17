const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-[#131c2e]
        border border-white/5
        text-gray-100
        rounded-2xl shadow-xl shadow-black/20
        p-4 sm:p-5 lg:p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
