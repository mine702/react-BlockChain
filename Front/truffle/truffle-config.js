
module.exports = {

  contracts_build_directory: "../client/src/contracts",

  networks: {
 
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },

    // development: {
    //   host: "127.0.0.1",     // Localhost (default: none)
    //   port: 8545,            // Standard Ethereum port (default: none)
    //   network_id: "*",       // Any network (default: none)
    // },
  
  },

  mocha: {
    
  },

  compilers: {
    solc: {
      version: "0.4.23",      
    }
  },

  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "sqlite",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
