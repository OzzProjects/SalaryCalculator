import React,{useState} from 'react';
import  './Main.css';
import { Box,Table,TableHead,TableCell,TableBody,Button,TextField, TableRow } from '@mui/material';
import styled from 'styled-components';

function Main(){

    const [salary,setSalary]= useState("");
    const [IsSubmit,setIsSubmit]=useState(false);

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
     <Box className="main-wrapper"  sx={{ textAlign: 'center',height: 'auto',width: 'auto'}}>

      <Box className="form-wrapper" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
       <form onSubmit={handleSubmit}>
        <h4 className="main-header">Salary Calculator </h4>
         <InputComponent salary={salary} passSetSalary={setSalary}/>
       </form>
      </Box>


      {IsSubmit ?
      <Box className="table-wrapper" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>  
          <div className="table-wrapper-styling">
             <Table className="table-itself">
              <TableHead className="table-headers">
                  <TableRow>
                  <TableCell className="empty-header"></TableCell>
                  <TableCell className="table-header">Yearly</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody className='table-body'>
                  <TableRow className='table-row'><TableCell className='row-title'>Gross Salary</TableCell><TableCell className='cell-result'>{salary}</TableCell></TableRow>
                  <TableRow className='table-row'><TableCell className='row-title'>Plus Tax </TableCell><TableCell className='cell-result'>{salaryAttr.taxedSalary}</TableCell></TableRow>
                  <TableRow className='table-row'><TableCell className='row-title'>Plus NI </TableCell><TableCell className='cell-result'>{salaryAttr.insurancedSalary}</TableCell></TableRow>
                  <TableRow className='stable-row'><TableCell className='row-title'>Net Salary</TableCell><TableCell className='cell-result'>{salaryAttr.netSalary}</TableCell></TableRow>
              </TableBody>
             </Table>
             </div>
      </Box>
      : 
      <></> 
      }

     </Box>
    );

}


function InputComponent({salary,passSetSalary}){
        
    const onChange=(e)=>{
        passSetSalary(e.currentTarget.value);
    }

  
    return (<InputWrapper>
                <TextField id="outlined-basic" sx={{ m: 2, width: {xs: '50vw', sm: '45vw',md: '35vw', lg: '30vw', xl: '40vw' }}}  variant="outlined" value={salary} onChange={onChange}/>
                <Box className="button-wrapper" sx={{alignItems:'center'}}  >
                <Button className="button-submit" sx={{ m:0 ,width:{xs: '50vw', sm: '30vw', md:'20vw',lg: '10vw', xl: '20vw' }}}  type="submit" variant="contained" >Submit</Button>
                </Box>
            </InputWrapper>);
}

const InputWrapper = styled.div`
        
@media (min-width:0px) and (max-width:599px){
    display:flex;
    align-items:center;
    flex-direction: column;
  }
@media (min-width:600px) and (max-width:899px){
    display:flex;
    align-items:center;
    flex-direction: column;
}
@media (min-width:900px) and (max-width:1199px){
    display:flex;
    align-items:center;
    flex-direction: row;
}
@media (min-width:1200px) and (max-width:1535px){
    display:flex;
    align-items:center;
    flex-direction: row;
}
@media (min-width:1536){
    display:flex;
    align-items:center;
    flex-direction: column;
}`;



export default Main;