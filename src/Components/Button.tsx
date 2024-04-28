function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textClr = "text-white",
  className = "",
  onClick,
  ...props
}: any) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded-lg ${textClr} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

/**
 * 
 * The form="myForm" attribute in the Button component is used to associate the button with a form element. This is particularly useful when you have multiple forms on a page and you want to specify which form the button should submit. The form attribute on a button specifies the ID of the form the button belongs to.

Here's a more detailed explanation:

Form ID: The form attribute value should match the id of the form you want the button to submit. In your example, form="myForm" means that the button is associated with a form that has an id of "myForm".
*
Usage: When a button has a form attribute, clicking the button will submit the form specified by the form attribute's value, instead of the form the button is nested within. This is useful for forms that are not directly nested within the button or when you want to place the button outside of the form for styling or layout reasons.
Here's an example to illustrate how it works:
 * 
<form id="myForm">
 <input type="text" name="username" required />
 <input type="password" name="password" required />
</form>

<Button
 type="submit"
 bgColor="bg-green-500"
 textClr="text-black"
 className="mt-4"
 onClick={() => console.log('Button clicked')}
 disabled={false}
 form="myForm"
>
 Submit
</Button>

 * 
 * 
 * 
 */
