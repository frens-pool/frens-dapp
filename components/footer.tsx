import Image from 'next/image'

const Footer = () => (
  <footer>
    <div className='flex justify-center mt-4'>
        <a href="/">
            Made with ❤️ by your frens 🧑‍🤝‍🧑
        </a>
    </div>
    <div className='flex justify-center py-4'>
        <Image
        src="/vercel-icon-dark.svg"
        alt="vercel"
        width={24}
        height={24}
        />
        <div className='mx-2 h-6 border-r-2 border-slate-500'></div>
        <div className='flex '>
            <p>Powered by</p>
            <a className="ml-1 font-bold" href="https://vercel.com/?utm_source=[frens]&utm_campaign=oss">
                Vercel
            </a>
        </div>
    </div>
  </footer>
);

export default Footer;
