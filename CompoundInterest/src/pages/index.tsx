import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Input from "../Components/Input.jsx";
import LineChart from "../Components/LineChart.jsx";
import DoughnutChart from "@/Components/DoughnutChart.jsx";
import CollapsibleBox from "@/Components/CollapsibleBox.jsx";
import RelatedCalculator from "@/Components/RelatedCalculator.jsx";
import { FaChartPie, FaChartLine } from "react-icons/fa";
import { MdOutlineShowChart } from "react-icons/md";
import DropDownInput from "../Components/DropDownInput.jsx";

export default function Home() {
  const [totalInvestment, settotalInvestment] = useState(100000.0);
  const [interestRate, setinterestRate] = useState(5);
  const [timePeriod, settimePeriod] = useState(5);
  const [compoundingFrequency,setcompoundingFrequency]=useState(1);
  
  let compoundInterest = 0;
  const [output, setOutput] = useState(127628);
  const [totalAmount, settotalAmount] = useState(125000);

  const [isLineChart, setCheck] = useState(true);
  const [graphPoints, setGraphPoints] = useState([100000,105000, 110250, 115762, 121550, 127628]);
  
  function calculate() {
    compoundInterest = Math.ceil(totalInvestment * Math.pow(1.0 + ((interestRate / 100.0) / compoundingFrequency), compoundingFrequency * timePeriod));
    if (compoundInterest === Infinity || isNaN(compoundInterest)) {
      setOutput(0);
    }
    else {
      setOutput(compoundInterest);
    }
    settotalAmount(compoundInterest+totalInvestment);
    
    calculateGraphPoints();
  }


  function calculateGraphPoints() {
    let points = [];
    points.push(totalInvestment);
    for (let i = 1; i <= timePeriod; i++) {
        compoundInterest = Math.floor(totalInvestment * Math.pow(1.0 + ((Number(interestRate) / 100.0) / compoundingFrequency), compoundingFrequency * i));
        console.log(compoundInterest);
        points.push(compoundInterest);
    }
    setGraphPoints(points);
  }

  return (
    <>
      <Head>
        <title>Compound Interest Calculator</title>
        <link rel="icon" href="./logo.png" />
        <link href="/dist/output.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          as="font"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&amp;family=Rubik:wght@400;500;600&amp;display=swap"
        />
        <meta name="description" content="Compound Interest Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Background image */}
      <div
        className={
          "bg-bg_image w-full h-full bg-center bg-cover object-cover fixed"
        }
      />

      <main
        className={
          "relative [@media(max-width:1200px)]:p-5 [@media(min-width:1200px)]:p-20 w-full overflow-x-hidden flex-col justify-between text-neutral-700 text-[14px]"
        }
      >
        <div>
          {/* Heading */}
          <div
            className={
              "text-[#000000] text-[40px] font-semibold text-center leading-tight  [@media(max-width:300px)]:text-3xl [@media(max-width:1366px)]:text-[36px]  [@media(min-width:1920px)]:text-[60px] "
            }
          >
            <span className={"text-blue-600"}>Compound Interest</span>{" "}
            Calculator
          </div>
          {/* Subheading */}
          <p className={"text-[#464143] mt-[10px] text-center  [@media(max-width:300px)]:text-sm text-[14px] [@media(min-width:1920px)]:text-[18px] font-normal  "}>
          Compound interest is a financial concept that refers to the interest on a loan or deposit calculated based on both the initial principal amount and 
          the accumulated interest from previous periods. In other words, the interest earned in a given period is added to the principal,
          and the total balance is used as the basis for calculating the interest in the next period. This process continues over time, causing the balance to grow at an exponential rate.
          </p>
        </div>

        {/* Calculator and side pannel */}
        <div
          className={
            "flex w-full 2xl:max-h-[494px] xl:max-h-[644px] mt-[50px] [@media(min-width:200px)]:gap-4 lg:justify-between [@media(max-width:1000px)]:flex-col md:flex-col lg:flex-row  "
          }
        >
          {/* Calculator and graph (WRAPPER) */}
          <div
            className={
              "flex [@media(max-width:1000px)]:flex-col flex-row [@media(min-width:200px)]:gap-10 p-[30px] [@media(max-width:1000px)]:w-[100%] lg:w-[75%] border-2 border-white rounded-[30px] shadow-md shadow-[#505C6227] bg-white bg-opacity-40 backdrop-blur-[30px]"
            }
          >
            {/* Calculator */}
            <div className={"text-left text-lg [@media(max-width:1000px)]:w-[100%] w-[50%] "}>
              {/* Input box wrapper */}
              <div
                className={
                  "flex-col justify-evenly font-medium text-[14px] [@media(min-width:1920px)]:text-[18px] max-sm:space-y-[12px]  xl:space-y-[20px] sm:space-y-[15px]"
                }
              >
                {/* Input box */}
                {/*input boxes*/}
                <div>
                  {/*Total investment block*/}
                  <div>Total investment</div>
                  <Input
                    id='initialInvestment'
                    type='rupees'
                    min={1000}
                    max={10000000}
                    step={100}
                    value={totalInvestment}
                    setValue={settotalInvestment}
                  />
                </div>


                <div>
                  {/*Interest rate block*/}
                  <div>Interest rate</div>
                  <Input
                    id='finalInvestment'
                    type='percentage'
                    min={1}
                    max={50}
                    step={0.1}
                    value={interestRate}
                    setValue={setinterestRate}
                  />
                </div>

                <div>
                  {/*Time Period block*/}
                  <div>Time Period(Yrs)</div>
                  <Input
                    id='timePeriod'
                    min={1}
                    max={30}
                    step={1}
                    value={timePeriod}
                    setValue={settimePeriod}
                  />
                </div>

                <div className=" flex  justify-between flex-warp ">
                  {/*Compounding frequency block*/}
                  <div className="w-[58%]">Compounding frequency</div>
                  <DropDownInput value={compoundingFrequency} setValue={setcompoundingFrequency}/>
                </div>

                
              </div>

              {/* Control Box Wrapper */}
              <div
                className={
                  "flex flex-warp justify-center mt-[40px] cursor-pointer"
                }
              >
                {/* Control boxes */}
                <div
                className={
                    " border-[1px] border-dashed gap-3 border-[#00D382] p-[4px] rounded-[35px] w-[250px] h-[56px] [@media(min-width:1920px)]:w-[350px]  [@media(min-width:1920px)]:h-[66px] flex justify-center items-center  "
                }
            >
                <div
                    className={
                        "flex justify-center items-center text-[18px] text-white font-semibold rounded-[30px]  w-[242px] h-[48px]  [@media(min-width:1920px)]:w-[342px]  [@media(min-width:1920px)]:h-[58px]  shadow-lg shadow-[#36b3665d] bg-[#00d382]"
                    }
                    onClick={calculate}
                >
                    Calculate
                </div>
            </div>
              </div>
            </div>

            {/* vertical line */}
            <div
              className={
                "-my-4 -mx-2 [@media(max-width:1000px)]:-mx-2  [@media(max-width:1000px)]:h-0 [@media(max-width:1000px)]:w-auto lg:h-auto lg:w-0 rounded-[50px] border-2 border-solid border-[#7070701A]"
              }
            ></div>

            {/* Charts/Graph wrapper */}
            <div className={"[@media(max-width:1000px)]:w-[100%] lg:w-[50%]"}>
              {/* Toggle Button */}
              <div
                className={
                  " absolute flex flex-wrap z-10 place-content-center  w-[61px] h-[33px]  rounded-[30px] border-2 border-solid border-white bg-[#505C6227] shadow-md shadow-[#505C6227] backdrop-blur-[30px] m-0"
                }
              >
                <button
                  className={
                    isLineChart
                      ? " w-[23px] h-[23px] rounded-[50px] text-white bg-[#0161FF] border-2 border-solid border-white p-[2px] mx-[1px]"
                      : " w-[23px] h-[23px] rounded-[50px] p-[2px] text-[#909090] mx-[1px]"
                  }
                  onClick={() => {
                    setCheck(true);
                  }}
                >
                  <MdOutlineShowChart />
                </button>
                <button
                  className={
                    isLineChart
                      ? " w-[23px] h-[23px] rounded-[50px] p-[2px] text-[#909090] mx-[1px]"
                      : " w-[23px] h-[23px] rounded-[50px] text-white bg-[#0161FF] border-2 border-solid border-white p-[2px] mx-[1px]"
                  }
                  onClick={() => {
                    setCheck(false);
                  }}
                >
                  <FaChartPie />
                </button>
              </div>

              {/* Charts/Graph */}
              <div className={" relative object-right-top [@media(min-width:200px)]:h-auto md:w-[100%]"}>
                {isLineChart ? (
                  <>
                    <LineChart points={graphPoints} />
                    <div className={"mb-3"}>
                      For an investment of {" "}
                      <span className={"font-semibold"}>
                      Rs.{totalInvestment.toLocaleString("en-In")}
                      </span>{" "}at {interestRate}% interest for a period of
                       {" "}
                      <span className={"font-semibold"}>
                        {timePeriod}
                      </span>{" "}
                      years,{" "}the compound interest earned will be{" "}
                      <span className={"font-semibold"}>
                      Rs.{output.toLocaleString("en-In")}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <DoughnutChart
                      totalInterestAmount={output} totalInvestmentAmount={totalInvestment} dependency={output} 
                    />
                    <div className={"flex-col"}>
                      <div className={"flex justify-between font-medium mb-3"}>
                        <div>Invested</div>
                        <div className={"font-semibold"}>
                        ???{totalInvestment.toLocaleString("en-In")}
                        </div>
                      </div>
                      <div className={"flex justify-between font-medium mb-3"}>
                        <div>Total Interest</div>
                        <div className={"font-semibold"}>
                        ???{output.toLocaleString(
                            "en-In"
                          )}
                        </div>
                      </div>
                      <div className={"flex justify-between font-medium mb-3"}>
                        <div>Total Amount</div>
                        <div className={"font-semibold"}>
                        ???{totalAmount.toLocaleString("en-In")}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Side Pannel */}
          <div
            className={
              "[@media(max-width:1000px)]:w-[100%] lg:w-[23%] max-h-inherit px-[20px] py-[22px] [@media(max-width:1000px)]:mt-[20px] lg:mt-0 border-2 border-white rounded-[30px] shadow-md shadow-[#505C6227] bg-white bg-opacity-40 backdrop-blur-[30px] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            }
          >
            <div className={"font-bold "}>How to use this calculator?</div>
            <CollapsibleBox
              heading={'Compound Interest'}
              content={'Compound interest is what happens when the interest you earn on savings begins to earn interest on itself'}
            />
            <CollapsibleBox
              heading={'Uses of Compound Interest calculation'}
              content={'Compound interest causes your wealth to grow faster. It makes a sum of money grow at a faster rate than simple interest because you will earn returns on the money you invest, as well as on returns at the end of every compounding period'}
            />
            
          </div>
        </div>

        {/* FAQ box */}
        <div
          className={
            "px-[25px] py-[10px] mt-[40px] border-2 border-white rounded-[30px] shadow-md shadow-[#505C6227] bg-white bg-opacity-40 backdrop-blur-[30px]"
          }
        >
          <CollapsibleBox
            heading={'What is Compound Interest?'}
            content={'Compound interest is a financial concept that refers to the interest on a loan or deposit calculated based on both the initial principal amount and the accumulated interest from previous periods. In other words, the interest earned in a given period is added to the principal, and the total balance is used as the basis for calculating the interest in the next period. This process continues over time, causing the balance to grow at an exponential rate.'}
          />

          <CollapsibleBox
            heading={'How to use the Compound Interest Calculator?'}
            content={'FundsIndia Compound Interest Calculator is very easy to use. Just plugin the principal amount, interest rate,compounding frequency, and tenure. The calculator will give you accurate results regardless of currency.'}
          />

          <CollapsibleBox
            heading={'How does the Simple Interest calculator work?'}
            content={
            <>
            It uses the following logic<br></br><br></br><div className="flex items-center"><div><b>Compound interest formula = </b></div><div><img src="https://www.linkpicture.com/q/formula.png" width={"150px"}></img></div></div><br></br><b>where: <br></br>P = Principal amount<br></br> R = Rate of interest <br></br>n = Compounding frequency per year <br></br>N = Total compounding frequency for the entire period calculated as (n x T); n being the compounding frequency per annum and T being the time period in a number of years. </b></>}
          />

          <CollapsibleBox
            heading={'Why should I use FundsIndia Compound Interest Calculator?'}
            content={'FundsIndia CI Calculator is an intuitive and easy to use application that can save the time of manually calculating Compound interest which is a rather complicated calculation. It can visualise the interest with principal amount in an easily understandable manner.'}
          />
        </div>

        {/* Related Calculators */}
        <div className={"my-[30px] "}>
          <div className={"font-bold mb-[14px] text-[#464143]"}>
            Related Calculators
          </div>

          <div className={"no-scrollbar overflow-x-auto flex -mx-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"}>
            <RelatedCalculator name={"SWP Calculator"} path={"#"} first={true} />

            <RelatedCalculator name={"CAGR Calculator"} path={"#"} />

            <RelatedCalculator name={"NPS Calculator"} path={"#"} />

            <RelatedCalculator name={"SSY Calculator"} path={"#"} />

            <RelatedCalculator name={"SD Calculator"} path={"#"} />

            <RelatedCalculator name={"SIP Calculator"} path={"#"} />

            <RelatedCalculator name={"Income Tax Calculator"} path={"#"} />

            <RelatedCalculator name={"PPF Calculator"} path={"#"} />

            <RelatedCalculator name={"Simple Interest calculator"} path={"#"} />

            <RelatedCalculator name={"EPF Calculator"} path={"#"} />
          </div>
        </div>
      </main>
    </>
  );
}
