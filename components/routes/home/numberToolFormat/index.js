import React, { useRef } from "react";
import { useRouter } from "next/router";
import ArithmeticProgression from "../numberTools/arithmeticProgression";
import RoundNumber from "../numberTools/roundNumber";
import GeomatricSeries from "../numberTools/geomatricSeries";
import GenerateRandomNumber from "../numberTools/generateRandomNumber";
import RomanToNumber from "../numberTools/romanToNumber";
import NumberToRoman from "../numberTools/numberToRoman";
import PrimeNumberSeries from "../numberTools/primeNumberSeries";
import FibonacciNumberSeries from "../numberTools/fibonacciNumberSeries";
import CubeAndCuberoot from "../numberTools/CubandCubroot";
import SquareAndSquareroot from "../numberTools/Square";
import SumOfFirstNDigits from "../numberTools/sumOfFirstNDigit";
import SeriesOrdering from "../numberTools/seriesOrderingNumber";
import PrimeFactors from "../numberTools/primeFactors";

function NumberToolFormat({ Data }) {
  const router = useRouter();
  const Name = router.query.type;
  const ref = useRef();

  return (
    <>
      <div ref={ref}>{/* <PdfToCsvDemo /> */}</div>
      <div className="">
        {/* Generate Arithmetic Progressionr */}
        {Name === "generate-arithmetic-progression" && (
          <>
            <ArithmeticProgression />
          </>
        )}

        {/* Geomatric Series */}
        {Name === "geomatric-series" && (
          <>
            <GeomatricSeries />
          </>
        )}
        {/* Prime Number Series */}
        {Name === "prime number-series" && (
          <>
            <PrimeNumberSeries />
          </>
        )}
        {/* Fibonacci Number Series */}
        {Name === "fibonacci number-series" && (
          <>
            <FibonacciNumberSeries />
          </>
        )}

        {/* Generate random number */}
        {Name === "generate-random-number" && (
          <>
            <GenerateRandomNumber />
          </>
        )}

        {/* Round the number */}
        {Name === "round-the-number" && (
          <>
            <RoundNumber />
          </>
        )}
        {Name === "roman-to-number" && (
          <>
            <RomanToNumber />
          </>
        )}
        {Name === "number-to-roman" && (
          <>
            <NumberToRoman />
          </>
        )}
        {Name === "cube-cuberoot" && (
          <>
            <CubeAndCuberoot />
          </>
        )}
        {Name === "Square-Squareroot" && (
          <>
            <SquareAndSquareroot />
          </>
        )}
        {Name === "Sum-Of-First-N-digits" && (
          <>
            <SumOfFirstNDigits />
          </>
        )}
        {Name === "Series-Ordering-of-Numbers" && (
          <>
            <SeriesOrdering />
          </>
        )}
         {Name === "Prime-factors-of-Number" && (
          <>
            <PrimeFactors />
          </>
        )}
      </div>
    </>
  );
}

export default NumberToolFormat;
