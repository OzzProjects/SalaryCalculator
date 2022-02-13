import React,{useState} from 'react';
import  './Main.css';

function Main(){

    const [salary,setSalary]= useState("");
    const [IsSubmit,setIsSubmit]=useState(false);

    const onChange = (e)=>{
        setSalary(e.currentTarget.value);
    }

    const [salaryAttr, setSalaryAttr]=useState({
        grossSalary:0,
        taxedSalary:0,
        insurancedSalary:0,
        netSalary:0
    });

    const handleSubmit=(e)=>{
        console.log("Form submitted");

        let taxAmount=calculateIncomeTax();
        let NIAmount=calculateNationalInsurance();
        let netAmount=salary-taxAmount-NIAmount;
        setSalaryAttr((prevState)=>({
            ...prevState,
            grossSalary:salary,
            taxedSalary:taxAmount,
            insurancedSalary:NIAmount,
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



    return(
     <div className="main-wrapper">
      
      <div className="form-wrapper"> 
       <form onSubmit={handleSubmit}>
        <h4 className="main-header">Salary Calculator </h4>
        <div className="input-wrapper">
            <input className="textbox" type="textbox" value={salary} onChange={onChange}/>
            <input className="button-submit" type="submit" value="submit"/>
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
                  </tr>
              </thead>
              <tbody className='table-body'>
                  <tr className='table-row'><th className='row-title'>Gross Salary</th><td className='cell-result'>{salary}</td></tr>
                  <tr className='table-row'><th className='row-title'>Plus Tax </th><td className='cell-result'>{salaryAttr.taxedSalary}</td></tr>
                  <tr className='table-row'><th className='row-title'>Plus NI </th><td className='cell-result'>{salaryAttr.insurancedSalary}</td></tr>
                  <tr className='table-row'><th className='row-title'>Net Salary</th><td className='cell-result'>{salaryAttr.netSalary}</td></tr>
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