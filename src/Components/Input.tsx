import React, { useId } from "react";

/* syntax of forwardRef
 const MyComponent = forwardRef(renderFunction(props, ref) => (
 <div ref={ref}>Hello, World!</div>
 ));  */
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props }: any,
  ref
) {
  const id = useId();
  return (
    <>
      <div>
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {" "}
            //htmlFor is used for accessibility
            {label}{" "}
          </label>
        )}

        <input
          id={id}
          type={type}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          {...props}
          ref={ref}
        />
      </div>
    </>
  );
});

export default Input;
