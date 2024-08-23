//ek function liya and ek aur function me pass krdiya
//it is like a wrapper which will take one function and then execute it
//next flag is passed to next stage(next middleware)

// const asyncHandler=()=>{}
// const asyncHandler=(func)=>{()=>{}}    //ek function liya and ek aur function me pass krdiya
// const asyncHandler=(func)=>async()=>{}

//two methods
// 1. try catch             2. promises

/* const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500)
    .json({             //sending error response in json
      success: false,
      message: error.message,
    });
  }
}; */

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};
export { asyncHandler };
