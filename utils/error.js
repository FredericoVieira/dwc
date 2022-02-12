const errors = {
  1: {
    title: "Connection to Metamask failed!",
    message: "Check if Metamask is installed/working properly.",
  },
  2: {
    title: "Invalid address!",
    message: "Provided address it's not an ERC-20 standard token.",
  },
};

const throwError = (errorCode) => {
  throw errors[errorCode];
};

export { throwError, errors };
