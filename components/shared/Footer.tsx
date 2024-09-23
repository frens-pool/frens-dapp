import Link from "next/link";

const Footer = () => (
  <footer className="bg-black pt-16 lg:pt-20 pb-24 lg:pb-24 flex flex-col lg:flex-row items-start lg:items-center justify-start">
      <img
        className="block h-[200px] lg:h-[259px] mb-8 lg:mb-0"
        src="/FRENS_logo_footer.png"
        alt="Staking with Frens"
      />
      <div className="flex-1"></div>
    <div className="flex flex-col items-start lg:items-end justify-start pr-[8vw] px-[12vw] lg:pr-[4vw]">
    <img
        className="block h-[36px] lg:h-[40px]"
        src="/FRENS_writing_coloured.png"
        alt="Staking with Frens"
      />
      <h2 className="font-extrabold text-[20px] my-2 teal-to-blue inline-block text-transparent bg-clip-text">Staking ETH together</h2>
      <Link href="/" className="text-white mt-2 text-[14px] font-semibold hover:text-frens-blue">All pools</Link>
      <Link href="/dashboard" className="text-white text-[14px] font-semibold hover:text-frens-blue">My Dashboard</Link>
      <Link href="https://docs.frens.fun/docs/manifesto" target="_blank" rel="noopener noreferrer" className="text-white text-[14px] font-semibold hover:text-frens-blue">Docs</Link>
      <Link href="/disclaimer" rel="noopener noreferrer" className="text-white text-[14px] font-semibold hover:text-frens-blue">Legal Disclaimer</Link>
      <Link href="/create" className="text-white text-[14px] font-semibold hover:text-frens-blue">New Pool</Link>
      <a href="https://frens.fun/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-slate-500 mt-6">
        Made with ❤️ by your{" "}
        <span className=" text-frens-main undeline">FRENS</span> 🤙
      </a>
      <div className="text-[12px] text-slate-500">Version: v1.0.0 - Commit Hash: 6b012eb</div>
    </div>
  </footer>
);

export default Footer;
