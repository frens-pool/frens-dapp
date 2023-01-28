import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const DropKeys = ({ onFileReceived }: { onFileReceived: any }) => {
  const [showDropzone, setShowDropzone] = useState(true);

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        var reader = new FileReader();

        reader.onload = function (evt: any) {
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
        <div className="border border-dashed border-green-500 bg-slate-200 w-full mb-2">
          <div className="py-6 font-medium">File imported !</div>
        </div>
      );
    }

    return (
      <div
        className="border border-dashed border-gray-500 bg-slate-200 w-full mb-2 p-2"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="">
            <button className="btn btn-primary disabled my-2">
              Click to select file
            </button>
            <div>drop now</div>
          </div>
        ) : (
          <div>
            <button className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white no-animation my-2">
              Click to select file
            </button>
            <div>or simply drop it here</div>
          </div>
        )}
      </div>
    );
  }

  return <MyDropzone />;
};
