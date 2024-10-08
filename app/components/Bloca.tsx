"use client";
import React, { useEffect, useState } from 'react';

const Bloca = () => {
  const [Height, setHeight] = useState(170);
  const [Weight, setWeight] = useState(60);
  const [Bmi, setBmi] = useState<number | string>();  // Change Bmi type to number | string

  // Define proper types for event handlers
  const handleChangeH = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value !== '') {
      setHeight(parseInt(value, 10)); // Turn the string into a number
    }
  };

  const handleChangeW = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value !== '') {
      setWeight(parseInt(value, 10)); // Turn the string into a number
    }
  };

  const BmiCalc = (height: number, weight: number) => {
    const heightInMeters = height / 100; // Convert height from cm to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(2); // Calculate BMI to 2 decimal places
  };

  useEffect(() => {
    setBmi(BmiCalc(Height, Weight)); // Set BMI as a string or number
  }, [Height, Weight]);

  const Health = ({ bmi }: { bmi: number | string }) => {
    let Answer : React.ReactNode;

    if (typeof bmi === 'number' || bmi !== '') {
      const bmiValue = parseFloat(bmi as string);

      if (bmiValue <= 18.5) {
        Answer = <p>You&apos;re underweight!</p>;
      } else if (18.5 < bmiValue && bmiValue <= 24.9) {
        Answer = <p>Your weight is normal.</p>;
      } else if (24.9 < bmiValue && bmiValue < 29.9) {
        Answer = <p>You&apos;re overweight!</p>;
      } else if (30 < bmiValue) {
        Answer = <p>You&apos;re obese, seek help!</p>;
      }
    }

    return Answer;
  };

  return (
    <div className="card bg-slate-600 w-full max-w-md mx-auto shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg md:text-xl">BMI Calculator</h2>
        <p className="text-sm md:text-base">Wanna know your BMI score?</p>
        <p className="text-sm md:text-base">Put your height and weight down below!</p>

        <div className="w-full md:w-80 h-auto mb-4">
          <h2 className="card-title mb-2 text-sm md:text-base">Height: {Height / 100} m</h2>
          <input
            type="range"
            onChange={handleChangeH}
            min={100}
            max={200}
            value={Height}
            className="range range-info w-full"
          />
          <div className="flex w-full justify-between text-xs">
            <span>1.00</span>
            <span>1.25</span>
            <span>1.50</span>
            <span>1.75</span>
            <span>2.00</span>
          </div>
        </div>

        <div className="w-full md:w-80 h-auto mb-4">
          <h2 className="card-title mb-2 text-sm md:text-base">Weight: {Weight} kg</h2>
          <input
            type="range"
            onChange={handleChangeW}
            min={30}
            max={200}
            value={Weight}
            className="range range-warning w-full"
          />
          <div className="flex w-full justify-between text-xs">
            <span>30</span>
            <span>70</span>
            <span>110</span>
            <span>150</span>
            <span>190</span>
          </div>
        </div>

        <div className="divider divider-error mb-4">BMI Score</div>
        <h2 className="font-medium text-lg md:text-xl">{Bmi}</h2>

        <div className="w-full md:w-80 h-auto">
          <input
            type="range"
            min={0}
            max={200}
            value={Bmi ? parseFloat(Bmi as string) : 0}
            className="range range-warning w-full"
            disabled // Disable the range input for BMI as it's not for user interaction
          />
          <div className="flex w-full justify-between text-xs">
            <span>0</span>
            <span>50</span>
            <span>100</span>
            <span>150</span>
            <span>200</span>
          </div>
        </div>

        <div className="mt-4">
          <Health bmi={Bmi || ''} />
        </div>
      </div>
    </div>
  );
};

export default Bloca;
