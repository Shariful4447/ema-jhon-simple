import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import '../Shipment/Shipment.css'
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => console.log('Form submitted', data);

  console.log(watch("example")); 

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input name='name' defaultValue={loggedInUser.name} {...register("NameRequired", { required: true })} placeholder='Your Name' />
      {errors.NameRequired && <span className='error'> *** Name is Required</span>}
      <input name='email' defaultValue={loggedInUser.email}{...register("EmailRequired", { required: true })} placeholder='Your Email'/>
      {errors.EmailRequired && <span className='error'> *** Email is Required</span>}
      <input name='address' {...register("AddressRequired", { required: true })} placeholder='Enter Your Address'/>
      {errors.AddressRequired && <span className='error'> *** Adress is Required</span>}
      <input name='Phone' {...register("PhoneRequired", { required: true })} placeholder='Enter Your Phone Number'/>
      {errors.PhoneRequired && <span className='error'> *** Phone Number is Required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;<p>This is shipment</p>