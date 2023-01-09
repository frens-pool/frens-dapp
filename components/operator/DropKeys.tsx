import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const DropKeys = ({ onFileReceived }: { onFileReceived: any }) => {
  const [showDropzone, setShowDropzone] = useState(true);

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        var reader = new FileReader();

        reader.onload = function (evt) {
          if (evt.target.readyState != 2) return;
          if (evt.target.error) {
            alert("Error while reading file");
            return;
          }

          const filecontent = evt.target.result;
          setShowDropzone(false);
          onFileReceived(filecontent);
        };

        reader.readAsText(file);
      });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    if (!showDropzone) {
      return (
        <h2>
          <b>File imported !</b>
        </h2>
      );
    }

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <button className="btn btn-primary no-animation my-2 mr-2">
            Click to select file
          </button>
        )}
      </div>
    );
  }

  return <MyDropzone />;
};
