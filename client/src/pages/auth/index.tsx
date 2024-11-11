import victori from '@/assets/victory.svg';

type Props = {


}

const Auth = (props: Props) => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">

    <div className=" w-[90%] h-[90%] bg-white shadow-xl rounded-lg flex flex-col justify-center items-center">
      <div className='flex justify-center items-center'>
      <h1 className="text-4xl ">Bienvenido</h1>
      <img src={victori} alt="victori" className="w-20 h-20"/>
      </div>
      

    </div>

    </div>
  )
}


export default Auth;