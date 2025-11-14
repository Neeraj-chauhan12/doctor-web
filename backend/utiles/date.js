const computeAgeFromDob=(dob)=>{
    if(!dob) return null;
    const d=new Date(dob);
    const diffMs=Date.now()-d.getTime();
    const ageDt=new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear()-1970);
}
module.exports={computeAgeFromDob};