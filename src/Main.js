import React,{useState} from 'react';
import  './Main.css';

function Main(){

    const [salary,setSalary]= useState("");
    const [IsSubmit,setIsSubmit]=useState(false);

    const onChange = (e)=>{
        setSalary(e.currentTarget.value);
    }

    const onChecked = (e)=>{
        console.log(e);
        if(e.currentTarget.className === "planOne"){
            console.log("Clicked Plan One");
            console.log(repayPlanAttr);
            setRepayPlanAttr((prevState)=>({
                ...prevState,
               repayPlanOne: !repayPlanAttr.repayPlanOne
            }));
            console.log(repayPlanAttr);
        }
        else if(e.currentTarget.className === "planTwo"){
            console.log("Clicked Plan Two");
            console.log(repayPlanAttr);
            setRepayPlanAttr((prevState)=>({
                ...prevState,
                repayPlanTwo: !repayPlanAttr.repayPlanTwo
              }));
        }
        else if(e.currentTarget.className === "planFour"){
            console.log("Clicked Plan Four");
            console.log(repayPlanAttr);
            setRepayPlanAttr((prevState)=>({
                ...prevState,
                repayPlanFour: !repayPlanAttr.repayPlanFour
              }));
        }

    }

    const [salaryAttr, setSalaryAttr]=useState({
        grossSalary:0,
        taxedSalary:0,
        insurancedSalary:0,
        sfinanceSalary:0,
        netSalary:0
    });

    const [repayPlanAttr, setRepayPlanAttr]=useState({
        repayPlanOne:false,
        repayPlanTwo:false,
        repayPlanFour:false
    });

    const handleSubmit=(e)=>{
        console.log("Form submitted");

        let taxAmount=calculateIncomeTax();
        let NIAmount=calculateNationalInsurance();
        let sfAmount=calculateRepaymentPlan();
        console.log(sfAmount);
        let netAmount=salary-taxAmount-NIAmount-sfAmount;
        setSalaryAttr((prevState)=>({
            ...prevState,
            grossSalary:salary,
            taxedSalary:taxAmount,
            insurancedSalary:NIAmount,
            sfinanceSalary:sfAmount,
            netSalary:netAmount

        }));

        setIsSubmit(true);
        e.preventDefault();

    }

    const calculateIncomeTax=()=>{
        let defaultTaxFreePersonalAllowance=12570;
        let twentyPercentLimit=37700;
        let fortyPercentLimit=150000;
        let taxAmount=0;
        if(salary<defaultTaxFreePersonalAllowance)
        {
            taxAmount=0;
        }else{

            if(salary<=twentyPercentLimit)
            {

                taxAmount=((salary-defaultTaxFreePersonalAllowance)*20/100);

            }else if(salary>twentyPercentLimit && salary<=fortyPercentLimit){

                if(salary>100000){

                 let reducedPersonalAllowance=(salary-100000/2 >defaultTaxFreePersonalAllowance)? 0: defaultTaxFreePersonalAllowance-salary-100000/2;
                 taxAmount=((salary-reducedPersonalAllowance)*40/100);

                }else{
                    taxAmount=((salary-defaultTaxFreePersonalAllowance)*40/100);
                }

            }else if(salary>150000){

                taxAmount=((salary-defaultTaxFreePersonalAllowance)*45/100);

            }
        }

        return taxAmount;
    }

    const calculateNationalInsurance=()=>{
        let minimumInsuranceLimit=9568;
        let maximumInsuranceLimit=50270;
        let insurancedSalary=0;
        if(salary<=minimumInsuranceLimit){
            insurancedSalary=0;
        }else if(salary>=minimumInsuranceLimit && salary<=maximumInsuranceLimit){
            insurancedSalary=(salary-minimumInsuranceLimit)*12/100;
        }else if(salary>maximumInsuranceLimit){
            insurancedSalary=((salary-minimumInsuranceLimit)*12/100)+((salary-maximumInsuranceLimit)*2/100);
        }
        return Math.round((insurancedSalary + Number.EPSILON) * 100) / 100;
    }

    const calculateRepaymentPlan=()=>{
        let bankOfEnglandInterest=1;
        let rpi =1;
        let salaryAmount=salary;
        console.log(repayPlanAttr);
        if(repayPlanAttr.repayPlanOne==true)
        {
          bankOfEnglandInterest = bankOfEnglandInterest+(bankOfEnglandInterest/100);
          let repayInterest = (rpi>bankOfEnglandInterest)? rpi :bankOfEnglandInterest;
          let repayAmount = salary *9 /100;
          salaryAmount =  (repayAmount+repayInterest);
        }
        else if(repayPlanAttr.repayPlanTwo==true)
        {
          let repayInterest = rpi+(rpi*3/100);
          let repayAmount = salary *9 /100;
          salaryAmount = (repayAmount+repayInterest);
        }
        else if(repayPlanAttr.repayPlanFour==true)
        {

        }
        else{
            salaryAmount=0;
        }
        return salaryAmount;
    }
    

    return(
     <div className="main-wrapper">
      <div className="form-wrapper">
       <form onSubmit={handleSubmit}>
        <h4 className="main-header">Salary Calculator </h4>
        <div className="input-wrapper">
            <input className="textbox" type="textbox" value={salary} onChange={onChange}/>
            <input className="button-submit" type="submit" value="submit"/>
        </div>
        <div className="input-options">
         <table className="table-itself">
         <thead className="table-headers">
             <tr>
             <th className="table-header"> Student Finance </th>
             </tr>
           </thead>
           <tbody className='table-body'>
             <tr className='table-row'>
             <th className='row-title'>Repayment Plan 1</th>
             <td className='cell-result'>   
              <input type="checkbox" className="planOne"   onChange={onChecked} value="" />
             </td>
             </tr>
             <tr className='table-row'>
             <th className='row-title'>Repayment Plan 2</th>
             <td className='cell-result'>   
              <input type="checkbox" className="planTwo"   onChange={onChecked} value="" />
             </td>
             </tr>
             <tr className='table-row'>
             <th className='row-title'>Repayment Plan 4</th>
             <td className='cell-result'>   
              <input type="checkbox" className="planFour" onChange={onChecked} value="" />
             </td>
             </tr>
            </tbody>
            </table>
        </div>
       </form>
      </div>


      {IsSubmit ?
      <div className="table-wrapper">
          <div className="table-wrapper-styling">
             <table className="table-itself">
              <thead className="table-headers">
                  <tr>
                  <th className="empty-header"></th>
                  <th className="table-header">Yearly</th>
                  <th className="table-header">Monthly</th> 
                  <th className="table-header">Weekly</th>
                  </tr>
              </thead>
              <tbody className='table-body'>
                  <tr className='table-row'><th className='row-title'>Gross Salary</th>
                  <td className='cell-result'>{salary}</td>
                  <td className='cell-result'>{salary/12}</td>
                  <td className='cell-result'>{salary/52}</td>
                  </tr>
                  <tr className='table-row'><th className='row-title'>Plus Tax </th>
                  <td className='cell-result'>{salaryAttr.taxedSalary}</td>
                  <td className='cell-result'>{salaryAttr.taxedSalary/12}</td>
                  <td className='cell-result'>{salaryAttr.taxedSalary/52}</td>
                  </tr>
                  <tr className='table-row'><th className='row-title'>Plus NI </th>
                  <td className='cell-result'>{salaryAttr.insurancedSalary}</td>
                  <td className='cell-result'>{salaryAttr.insurancedSalary/12}</td>
                  <td className='cell-result'>{salaryAttr.insurancedSalary/52}</td>

                  </tr>
                  <tr className='table-row'><th className='row-title'>Plus SFinance </th>
                  <td className='cell-result'>{salaryAttr.sfinanceSalary}</td>
                  <td className='cell-result'>{salaryAttr.sfinanceSalary/12}</td>
                  <td className='cell-result'>{salaryAttr.sfinanceSalary/52}</td>
                  </tr>
                  <tr className='table-row'><th className='row-title'>Net Salary</th>
                  <td className='cell-result'>{salaryAttr.netSalary}</td>
                  <td className='cell-result'>{salaryAttr.netSalary/12}</td>
                  <td className='cell-result'>{salaryAttr.netSalary/52}</td>
                  </tr>
              </tbody>
             </table>
             </div>
      </div>
      :
      <></>
      }


     </div>
    );

}
export default Main;
