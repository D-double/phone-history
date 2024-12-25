import s from './CustomBtn.module.scss'


const CustomBtn = ({text, icon, width, height, mt, disabled, m, onClick}) => {
  return (
    <button 
        onClick={onClick}
        disabled={disabled} 
        className={s.btn} 
        style={{width: width, height: height, marginTop: mt, marginLeft: m, marginRight: m}}>
      {icon && <img src={icon} alt="" />}
      <span>{text}</span>
    </button>
  )
}

export default CustomBtn