import { Link } from "react-router";
import CustomInput from "../components/UI/CustomInput";
import CustomBtn from "../components/UI/CustomBtn";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/user-store";

const Login = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector((state)=> state.user)
  const {
    register, //  метод позволяет вам регистрировать элемент ввода
    handleSubmit, // получит данные формы, если проверка формы прошла успешно
    reset, // cбросить все состояния формы
    formState: {
      // одержит информацию о состоянии всей формы
      errors, // Объект с ошибками поля.
      isValid, // Установите значение true, если в форме нет ошибок.
    },
  } = useForm({ mode: "onChange" });


  const loginOnSubmit = async (data) => {
    try {
      dispatch(loginUser(data))
      console.log("Авторизация прошла успешно!");
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <div className="enter">
      <h1 className="enter__title">Вход</h1>
      <form
        action=""
        className="enter__form"
        onSubmit={handleSubmit(loginOnSubmit)}
      >
        <CustomInput
          register={register("username", {
            required: "Это поле обязательно для заполнения",
            minLength: {
              value: 3,
              message: "минимум 3 символа",
            },
          })}
          errors={errors.username}
          label="Ваше имя"
          type="text"
          holder="Имя"
        />
        <CustomInput
          register={register("password", {
            required: "Это поле обязательно для заполнения",
            // validate: (value)=> value == password2 || 'Пароли не совпадают',
            minLength: {
              value: 3,
              message: "минимум 8 символа",
            },
          })}
          errors={errors.password}
          label="Ваш пароль"
          type="password"
          holder="Ваш пароль"
        />
        <CustomBtn
          text="Вход"
          width={248}
          height={60}
          disabled={!isValid}
          m="auto"
        />
      </form>
      <div className="enter__info">
        <p className="enter__desc">Нет акканута?</p>
        <Link to="/" className="enter__auth">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default Login;
