import React from 'react'
import { useRouter } from "next/router";
import FileAgeCalc from './fileAgeCalc'
import BMICalculator from './fileBMICalculator'
import CgpaToPerc from './fileCGPAtoPerCalc'
import LogCalculator from './fileLogCalc'
import FileGstCalc from './fileGstCalc'
import FileIncomeTaxCalc from './fileIncomeTaxCalc'
import FileLoanCalc from './fileLoanCalc'
import FilePercentageCalc from './filePercentageCalc'
import FileSalaryCalc from './fileSalaryCalc'
import TimeSheetCal from './fileTimeSeetCalc'
import FileUploadBoxCalc from './fileUploadBoxCalc'
import MortgageCalculator from './mortgageCalculator'
import SassProductCalc from './saasProductCalc'

function CalculatorToolsData() {
  const router = useRouter();
  const Name = router.query.type;
  return (
    <>
    {Name === "age-calculator"  && 
    <>
    <FileAgeCalc/>
    </>
    }
     {Name === "bmi-calculator"  &&  
    <>
    <BMICalculator/>
    </>
    }
     {Name === "log(logarithm)-calculator"  &&
    <>
    <LogCalculator/>
    </>
    }
     {Name === "gst-calculator"  &&
    <>
    <FileGstCalc/>
    </>
    }
     {Name === ""  &&
    <>
    <FileIncomeTaxCalc/>
    </>
    } 
    {Name === "loan-calculator"  &&
    <>
    <FileLoanCalc/>
    </>
    } 
    {Name === "percentage-calculator"  &&
    <>
    <FilePercentageCalc/>
    </>
    } 
    {Name === "salary-calculator"  &&
    <>
    <FileSalaryCalc/>
    </>
    } 
    {Name === "timesheet-calculator"  &&
    <>
    <TimeSheetCal/>
    </>
    } 
    {Name === ""  &&
    <>
    <FileUploadBoxCalc/>
    </>
    }
     {Name === "cpi-cgpa-to-percentage-calculator"  &&
    <>
    <CgpaToPerc/>
    </>
    }
     {Name === "mortgage-calculator"  &&
    <>
    <MortgageCalculator/>
    </>
    } 
    {Name === "saas-product-calculator"  &&
    <>
    <SassProductCalc/>
    </>
    }
     
    </>
  )
}

export default CalculatorToolsData