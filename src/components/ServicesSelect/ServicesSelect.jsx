import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedService, getPriceCount } from '../../store/email/email';
import './servicesSelect.scss'

const ServicesSelect = () => {
  const { service, selectedService } = useSelector((state) => state.email)
  const dispatch = useDispatch()
  const options = service?.map((elem)=>(
    { 
      value: elem.id, 
      label: (
        <div className="service-select__element">
          <img src={elem.img} alt="" />
          <span>{elem.name}</span>
        </div>
      )
    }
  ))
  const selectedOption = options?.find((elem)=> elem.value == selectedService);
  const changeHandler = (opt)=>{
    dispatch(setSelectedService(opt.value))
    dispatch(getPriceCount(opt.value))

  }

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={changeHandler}
        options={options}
        value={selectedOption}
        className='service-select'
        classNamePrefix="service-select"
        placeholder='Выберите сервис'
      />
    </div>
  );
}

export default ServicesSelect