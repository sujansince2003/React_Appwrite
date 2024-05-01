// import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RealTimeEditor({ name, control, label, defaultValue = "" }: any) {
  return (
    <>
      <div className="w-full">
        {label && <label className="text-sm text-gray-600">{label}</label>}

        <Controller
          name={name || "content"} // The 'name' prop is used here to register the editor with React Hook Form
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange} //The 'onChange' function provided by the Controller is used to update the form state
            />
          )}
        />
      </div>
    </>
  );
}

export default RealTimeEditor;

/**
  a "controller" is a component that helps you integrate third-party input components (like date pickers, sliders, or any custom input components) with React Hook Form's form management while still benefiting from React Hook Form's features like form validation, error handling, and form state management.






  code exp:
   The name prop is used to uniquely identify the form field within the form context managed by React Hook Form.like we use ...register("email")  here email is name used to identify for input field of email

field in render:
the onchange is property availabe inside the field.this indicates that when something get change in this field then inform it which is basically handled by render function





   control Prop
Purpose: The control prop is used to connect the Controller component from React Hook Form with the form context. This connection is essential for the Controller to manage the state of the TinyMCE editor, including its value and validation status.
Usage: You pass the control prop to the Controller component, which is obtained from the useForm hook in the parent component. This allows the Controller to register the TinyMCE editor with React Hook Form's form context, enabling form state management, validation, and error handling for the editor.basically passing state from this component to the hook form where it is used
 



Real time editor
When you use a real-time editor package in your application, the content you create and save using that editor is typically stored in the form of HTML, not plain text. This is because real-time editors often allow users to apply various formatting options to their text, such as making text bold, italic, changing font sizes, adding links, and more. These formatting options are represented using HTML tags and attributes.


*/
