const {validationResult}=require("express-validator")

exports.generateErrorObj=(req)=>{
    let errorsObj={};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().map(errorObj=>{
          errorsObj[errorObj.param]=errorObj.msg
      }) 
}

return ({
    isValid:Object.keys(errorsObj).length===0,
    errors:errorsObj
})
}