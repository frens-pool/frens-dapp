export const truncateAddress = (addr: string) => {
    if(addr) {
    console.log("HIER addr;;;;",addr);
    `${addr.slice(0, 5)}...${addr.slice(-3)}`;
    }
}
    // `${addr.slice(0, 5)}...${addr.slice(-3)}`;
  