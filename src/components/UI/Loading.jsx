import s from './Loading.module.scss'

const Loading = ({size}) => {
  return (
    <div className={s.loader}>
      { size ? 
        <div className={s.loader__icon} style={{width: size, height: size}}></div>:
        <div className={s.loader__icon} ></div>
      }
    </div>
  )
}

export default Loading