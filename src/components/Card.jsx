const Card = ({ children, className = "" }) => {
    return (
        <div
            className={`
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100
        rounded-xl shadow
        p-3 sm:p-4 lg:p-6
        mx-3 sm:mx-4 lg:mx-0
        max-w-md lg:max-w-2xl
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
