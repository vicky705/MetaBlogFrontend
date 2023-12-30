import React, { useContext, useState } from 'react'
import {Country, State, City} from 'country-state-city'
import { ToastContainer, toast } from 'react-toastify';
import blogContext from '../Context/blogContext';

function Profile() {
  const [country, setCountry] = useState(Country.getAllCountries())
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  
   

   const {profile, setProfile, updateProfileHandler} = useContext(blogContext)
   

  const onChangeInputHandler = (event) => {
    if(event.target.name === "addressline" || event.target.name === "pincode"){
      setProfile(preProfile => ({
        ...preProfile,
        address : {
          ...preProfile.address, [event.target.name] : event.target.value
        }
      }))
    }
    else{
      setProfile({...profile, [event.target.name] : event.target.value})
    }
  }
  
  const onClickUpdateHandler = async() => {
    if(profile.name.trim().length <= 0) return toast.warning('Invalid name.')
    if(profile.username.trim().length <= 0) return toast.warning('Invalid Username.')
    if(profile.email.trim().length <= 0) return toast.warning('Invalid Email.')
    if(profile.gender.trim().length <= 0) return toast.warning('Invalid Gender.')
    if(profile.address.addressline.trim().length <= 0) return toast.warning('Invalid Address Line 1.')
    if(profile.address.country.trim().length <= 0) return toast.warning('Invalid Country.')
    if(profile.address.state.trim().length <= 0) return toast.warning('Invalid State.')
    if(profile.address.city.trim().length <= 0) return toast.warning('Invalid City.')
    const temp_pin = parseInt(profile.address.pincode.trim())+"";
    if(profile.address.pincode.trim().length !== 6 || temp_pin.length !== profile.address.pincode.trim().length) return toast.warning('Invalid Pincode.')
    
    const res =await updateProfileHandler(profile)
    console.log(res)
    if(!res.status) return toast.warn(res.msg)
    toast.success('Done.')

  }

  const [addressCode, setAddressCode] = useState({
    countryCode : "",
    stateCode : "",
    cityCode : ""
  })

  const onChangeCountryHandler = (event) => {
    const code = event.target.value;
    setAddressCode({...addressCode, countryCode : code})
    setState(State.getStatesOfCountry(code))
    setProfile(preProfile => ({
      ...preProfile,
      address : {
        ...preProfile.address, country : Country.getCountryByCode(code).name
      }
    }))
  }
  const onChangeStateHandler = (event) => {
    const code = event.target.value;
    setAddressCode({...addressCode, stateCode : code})
    setCity(City.getCitiesOfState(addressCode.countryCode, code))
    setProfile(preProfile => ({
      ...preProfile, 
      address : {
        ...preProfile.address, state : State.getStateByCode(code).name
      }
    }))
  }
  const onChangeCityHandler = (event) =>{
    const name = event.target.value;
    setProfile(preProfile => ({
      ...preProfile,
      address : {
        ...preProfile.address, city : name
      }
    }))
  }
  return (
    <div className='container-fulid admin-profile'>
      <ToastContainer />
      <div className="container form">
        <div className="row">
          <div className='logo-div'><img className='profile-logo' src='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg'/></div>
          <div className="col-lg-6 col-mg-6 col-sm-12 col-12">
            <label className='text-label mt-2'>Name</label><br></br>
            <input type='text' name='name' value={profile.name} className='text-input mt-2' placeholder='Name' onChange={e => onChangeInputHandler(e)}/>
          </div>
          <div className="col-lg-6 col-mg-6 col-sm-12 col-12">
            <label className='text-label mt-2'>Username</label><br></br>
            <input type='text' name='username' value={profile.username} className='text-input mt-2' placeholder='Username' onChange={e => onChangeInputHandler(e)}/>
          </div>
          <div className="col-sm-12 col-12">
            <label className='text-label mt-2'>Email</label><br></br>
            <input type='email' name='email' value={profile.email} className='text-input mt-2' placeholder='Email' onChange={e => onChangeInputHandler(e)}/>
          </div>
          <div className='col-12'>
            <label className='text-label mt-2'>Gender :</label>
            <input type='radio' className='radio-input mt-2' checked={profile.gender === "Male"} name='gender' value='Male' onChange={e => onChangeInputHandler(e)}/><span> Male</span>
            <input type='radio' className='radio-input mt-2' checked={profile.gender === "Female"} name='gender' value='Female' onChange={e => onChangeInputHandler(e)}/><span> Female</span>
          </div>
          <div className="col-12">
            <label className='text-label mt-2'>Address Line 1</label><br></br>
            <input type='text' name='addressline' value={profile.address.addressline} className='text-input mt-2' placeholder='Address 1' onChange={e => onChangeInputHandler(e)}/>
          </div>
          <div className="col-lg-6 col-mg-6 col-sm-12 col-12">
            <label className='text-label mt-2'>Country</label><br></br>
            <select className='text-input mt-2' name='country' onChange={e => onChangeCountryHandler(e)}>
              <option>------ Select Country -----</option>
              {country.map((item) => {
                return (
                  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                )
              })}
            </select>
          </div>
          <div className="col-lg-6 col-mg-6 col-sm-12 col-12">
            <label className='text-label mt-2'>State</label><br></br>
            <select className='text-input mt-2' onChange={e => onChangeStateHandler(e)}>
              <option>----- Select State -----</option>
              {state.map((item) => {
                return (
                  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                )
              })}
            </select>
          </div>
          <div className="col-lg-6 col-mg-6 col-sm-12 col-12">
            <label className='text-label mt-2'>City</label><br></br>
            <select className='text-input  mt-2' onChange={e => onChangeCityHandler(e)}>
              <option>----- Select City -----</option>
              {city.map((item) => {
                return (
                  <option key={item.isoCode} value={item.name}>{item.name}</option>
                )
              })}
            </select>
          </div>
          <div className="col-lg-6 col-mg-6 col-sm-12 col-12">
            <label className='text-label mt-2'>Pincode</label><br></br>
            <input type='text' name='pincode' value={profile.address.pincode} maxLength='6' className='text-input mt-2' placeholder='Pincode' onChange={e => onChangeInputHandler(e)}/>
          </div>
        </div>
        <button className='update-btn' onClick={() => onClickUpdateHandler()}>Update</button>
      </div>
    </div>
  )
}

export default Profile
