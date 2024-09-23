export const ProgressBar = ({ progressPercentage }:{ progressPercentage:number }) => {

    return (
        <div className='h-1 flex-1 bg-gray-300'>
            <div
                style={{ width: `${progressPercentage}%`}}
                className={`h-full ${
                    progressPercentage < 70 ? 'bg-frens-blue' : 'bg-green-600'}`}>
            </div>
        </div>
    );
  };