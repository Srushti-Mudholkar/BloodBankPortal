import React,{useState,useEffect} from 'react';
import API from '../../utils/axios';
import { useFormik } from 'formik';
import * as Yup from "yup";


const DonorList = () => {
    const [donors,setDonors] = useState([]);
    const[orgs,setOrgs] = useState([])
   const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchOrgs() 
    },[])

   const fetchOrgs = async() => {
     try {
      const {data} = await API.get("/inventory/organisations")
      if(data.success)
        setOrgs(data.organisations)
     } catch(e){
       console.log(e)
     } finally {
        setLoading(false)
     }
   }

   const formik = useFormik({
     initialValues : {
      bloodGroup: "",
      quantity: "",
      organisation: "",
      message: ""
     },
     validationSchema : Yup.object({
       bloodGroup: Yup.string().required("Blood group is required"),
       quantity: Yup.number().min(1).required("Quantity is required"),
       organisation: Yup.string().required("Select an organisation"),
     }),
     onSubmit : async(values) => {
        console.log(values)
     }
   })
  return (
    <div>
       {
        loading ? (
        <p>Loading orgs</p>
        ) : 
        (orgs.map((org)=>(
            <p key={org._id}>{org.organisationName}</p>
        )))
       }
    </div>
  )
}

export default DonorList;
