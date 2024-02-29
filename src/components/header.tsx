import netomiIcon from '../assets/netomi_logo.svg'

export default function Header() {
  return (
    <div className={'mb-[45px]'}>
      <h1 className="text-[50px] font-normal text-white">
        <img src ={netomiIcon}/>
      </h1>
    </div>
  );
}
