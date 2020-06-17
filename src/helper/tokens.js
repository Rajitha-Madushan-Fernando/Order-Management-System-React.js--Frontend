const _dataName = 'tokens';
const tokens = {
   get: (varName='')=>{ 
      const localDataJson  = JSON.parse(localStorage.getItem(_dataName));
      if(localDataJson===null){
         return null;
      }
      if(varName===''){
         return localDataJson;
      }
      return localDataJson[varName];
   },
   save: (newData, callback=()=>{})=>{
      let jsonData  = JSON.parse(localStorage.getItem(_dataName)); 
      if(jsonData===null) {
         jsonData = {};
      } 
      localStorage.setItem(_dataName, JSON.stringify({...jsonData,...newData}));
      callback();
   },
   userType: ()=>{
      return tokens.get('userType');
   }
} 
export default tokens