import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export type validateFileFunction = (fileContent: any) => {
  success: boolean,
  error?: string
}

export const DropKeys = ({ validateFile, onFileReceived, filename }: {
  onFileReceived: any,
  validateFile: validateFileFunction,
  filename: string
}) => {
  const [showDropzone, setShowDropzone] = useState(true);
  const [feedback, setFeedback] = useState<string>();

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

          const validationResult = validateFile(filecontent)
          if (validationResult.success) {
            setShowDropzone(false);
            onFileReceived(filecontent);
            setFeedback(undefined)
          } else {
            setFeedback(validationResult.error)
          }
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
            <div>filename should be <b>{filename}</b></div>
            {feedback && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">{feedback}</strong>
              </div>
            )
            }
          </div>
        )}
      </div>
    );
  }

  return <MyDropzone />;
};
