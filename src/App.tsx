import React, { useState } from "react";


 
interface Errors {
  cardholderName?: string;
  cardNumber?: string;
  expDate?: string;
  cvv?: string;
}

const InteractiveCardForm: React.FC = () => {
  const [cardholderName, setCardholderName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expMonth, setExpMonth] = useState<string>("");
  const [expYear, setExpYear] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateInputs = (): boolean => {
    const newErrors: Errors = {};

    if (!cardholderName.trim()) {
      newErrors.cardholderName = "Can't be blank";
    }

    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Can't be blank";
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Wrong format, numbers only";
    }

    if (!expMonth.trim() || !expYear.trim()) {
      newErrors.expDate = "Can't be blank";
    } else if (!/^\d{2}$/.test(expMonth) || !/^\d{2}$/.test(expYear)) {
      newErrors.expDate = "Wrong format, numbers only";
    }

    if (!cvv.trim()) {
      newErrors.cvv = "Can't be blank";
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "Wrong format, numbers only";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      setIsSubmitted(true);
    }
  };

  const formatCardNumber = (number: string): string => {
    return number.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Card Background */}
      <div className="lg:w-1/3 bg-[url('./public/bg-card-front.png')] bg-cover bg-center flex items-center justify-center p-8">
        <div className="relative">
          {/* Front Card */}
          <div className="bg-[url('./public/bg-card-front.png')] bg-cover bg-center w-96 h-56 rounded-lg shadow-lg p-6  text-white relative z-10">
            <img src="./public/card-logo.svg" alt="card logo" className="mb-8" />
            <div className="text-xl font-semibold tracking-wider mb-4">
              {cardNumber ? formatCardNumber(cardNumber) : "0000 0000 0000 0000"}
            </div>
            <div className="flex justify-between text-sm">
              <div>{cardholderName || "JANE APPLESEED"}</div>
              <div>
                {expMonth || "00"}/{expYear || "00"}
              </div>
            </div>
          </div>
          {/* Back Card */}
          <div className="bg-[url('./public/bg-card-back.png')] bg-cover bg-center w-96 h-56 rounded-lg shadow-lg mt-6 relative">
            <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-white">
              {cvv || "000"}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:w-2/3 flex items-center justify-center p-8">
        {isSubmitted ? (
          <div className="text-center">
            <img src="./public/icon-complete.svg" alt="complete" className="mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-4">THANK YOU!</h2>
            <p className="text-gray-500 mb-8">We've added your card details</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">CARDHOLDER NAME</label>
              <input
                type="text"
                placeholder="e.g. Jane Appleseed"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className={`w-full p-3 border rounded-lg ${
                  errors.cardholderName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cardholderName && (
                <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">CARD NUMBER</label>
              <input
                type="text"
                placeholder="e.g. 1234 5678 9123 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className={`w-full p-3 border rounded-lg ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">EXP. DATE (MM/YY)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM"
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                    className={`w-full p-3 border rounded-lg ${
                      errors.expDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="YY"
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                    className={`w-full p-3 border rounded-lg ${
                      errors.expDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.expDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expDate}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">CVC</label>
                <input
                  type="text"
                  placeholder="e.g. 123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className={`w-full p-3 border rounded-lg ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirm
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InteractiveCardForm;


