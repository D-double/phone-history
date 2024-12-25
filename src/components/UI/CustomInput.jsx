import './auth-layout.scss'
const CustomInput = ({ register, errors, label, type, holder }) => {
  return (
    <div className="enter__item">
      <label>
        <span className="enter__text">{label}</span>
        <input
        {...register}
        type={type} className="enter__input" placeholder={holder}
        /> 
      </label>
      <p className="enter__error">{errors && <>{errors.message}</>}</p>
    </div>
  )
}

export default CustomInput