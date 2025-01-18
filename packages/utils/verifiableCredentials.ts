export const decodeVcData = (jwt: string) => {
  const data = jwt.split(".")?.[1]; // gets the middle part of the jwt
  return JSON.parse(atob(data));
};

export const getDataFromVCJwt = (jwt: any) => {
  if(typeof jwt !== 'string'){
    return jwt;
  }
  const decodedVcData = decodeVcData(jwt);

  return decodedVcData?.vc?.credentialSubject;
};
