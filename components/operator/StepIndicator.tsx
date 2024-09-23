export const StepIndicator = ({ step }: { step: any }) => {
  return (
    <ul className="steps mt-2">
      <li className={`step px-1 ${step >= 1 ? "step-primary" : ""}`}>
        Create Keys
      </li>
      <li className={`step px-1 ${step >= 2 ? "step-primary" : ""}`}>
        Upload Deposit file
      </li>
      <li className={`step px-1 ${step >= 3 ? "step-primary" : ""}`}>
        Select operators
      </li>
      <li className={`step px-1 ${step >= 4 ? "step-primary" : ""}`}>
        Upload keystore
      </li>
      <li className={`step px-1 ${step >= 5 ? "step-primary" : ""}`}>
        Register validator
      </li>
      <li className={`step px-1 ${step >= 6 ? "step-primary" : ""}`}>
        Deposit 32 ETH
      </li>
    </ul>
  );
};
