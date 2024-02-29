import netomiIcon from '../assets/netomi_logo.svg';

export default function Header() {
  return (
    <div className={'flex w-[60px] select-none items-center justify-center'}>
      {/*<h1 className="text-[50px] font-normal text-white">*/}
      <img className={'h-full w-full'} src={netomiIcon} />
      {/*</h1>*/}
    </div>
  );
}
