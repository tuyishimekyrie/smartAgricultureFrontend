const getToken = (key: string) => {
  if (typeof window === 'undefined') {
    return null; 
  }

  const token = localStorage.getItem(key);
  return token ? token : null;
}

export default getToken;