var config = require('../db.config');
var sen = require('../modules/sentense')
var sql = require('mssql');

 async function GetAllTypes(){
    try{
        let pool =await sql.connect(config);
        let types = await pool.request().query("SELECT * FROM TYPES");
        return types.recordsets;
    }
    catch(error)
    {
     console.log(error);
    }
}

async function GetAllSentense(){
    try{
        let pool =await sql.connect(config);
        let sentences = await pool.request().query("SELECT * FROM SENTENSE");
        return sentences.recordsets;
    }
    catch(error)
    {
     console.log(error);
    }
}
  async function AddSentense(sentense){
      try{
        let pool =await sql.connect(config);
        let insert = await pool.request()
       // .input('Id', sql.Int,sentense.Id)
        .input('SentenseName', sql.NVarChar,sentense.SentenseName)
        .input('TypeId', sql.Int,sentense.TypeId)
        .execute('insertSentense');
        return insert.recordsets;
      }
      catch(error){
          console.log(error);
      }
  }

module.exports ={
    GetAllTypes : GetAllTypes,
    GetAllSentense: GetAllSentense,
    AddSentense : AddSentense
}