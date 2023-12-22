const Footer = () => (
  <footer className="bg-white z-20 flex justify-center content-center p-8">
    <div className="z-20">
      <a href="https://frens.fun/" target="_blank" rel="noopener noreferrer">
        Made with ❤️ by your{" "}
        <span className=" text-frens-main undeline">FRENS</span> 🤙
      </a>
      {/* <div className="flex justify-center mt-4">
        <Image
          src="/vercel-icon-dark.svg"
          alt="vercel"
          width={24}
          height={24}
        />
        <div className="mx-2 h-6 border-r-2 border-slate-500"></div>
        <div className="flex ">
          <p>Powered by</p>
          <a
            className="ml-1 font-bold"
            href="https://vercel.com/?utm_source=[frens]&utm_campaign=oss"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
        </div>
      </div> */}
    </div>
  </footer>
);

export default Footer;
