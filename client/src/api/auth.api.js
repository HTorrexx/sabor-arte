import axios from "axios";

export const singUpRequests = async (user) =>
  {
    const form = new FormData();
  
    for (let key in user) {
      form.append(key, user[key]);
    }
  
    return await axios.post("http://localhost:4000/singup", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  export const singInRequests = async (user) =>
  {
    const form = new FormData();
  
    for (let key in user) {
      form.append(key, user[key]);
    }
  
    return await axios.post("http://localhost:4000/singin", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };